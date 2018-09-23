import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Panel from '../../components/UI/Panel';
import Queries from '../../graphql/queries'
import Mutations from '../../graphql/mutations'

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  field: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    marginLeft: theme.spacing.unit * 3
  }
});

class CreateTransaction extends Component {
  state = {
    notifying: false,
    lastCreatedTransaction: null
  };

  updateCache = (cache, { data }) => {
    const { createTransaction } = data;
    const queryPayload = {
      query: Queries.GET_TRANSACTIONS,
      variables: { id: this.props.walletId }
    };
    const res = cache.readQuery(queryPayload);

    const transactions = res.wallet.transactions;
    const freshData = {
      ...res,
      wallet: {
        ...res.wallet,
        transTransaction: transactions.concat([createTransaction])
      }
    };
    cache.writeQuery({
      ...queryPayload,
      data: freshData
    });
  };

  validateForm(values) {
    let errors = {};
    if (!values.password) {
      errors.password = true;
    }
    return errors;
  }

  handleTransactionCreation = res =>
    this.setState({
      notifying: true,
      lastCreatedTransaction: res.createTransaction
    });

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ notifying: false });
  };

  render() {
    const { classes, walletId } = this.props;
    
    const renderForm = ({ createTransaction, classes, loading, error }) = (  
      <Formik
        initialValues={{ walletId: this.props.walletId, password: '' }}
        validate={this.validateForm}
        onSubmit={({ password }, { setSubmitting }) => {
          createTranTransaction({
            variables: { id: walletId, password }
          });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <Field
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  className={classes.field}
                  value={field.value.password}
                  type="password"
                  placeholder="Password"
                  error={errors.password && touched.password}
                />
              )}
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              disabled={isSubmitting || loading}
            >
              Submit
            </Button>
            {error && <p>Error :( Please try again</p>}
          </Form>
        )}
      </Formik>
    )

    const snackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={this.state.notifying}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={
          <span>
            Transaction created with ID: {this.state.lastCreatedTransaction}
          </span>
        }
      />
    )

    return (
      <Mutation
        mutation={Mutations.CREATE_TRANSACTION}
        update={this.updateCache}
        onCompleted={this.handleTransactionCreation}
      >
        {(createTranTransaction, { loading, error }) => (
          <React.Fragment>
            <Panel className={classes.root} title="Create Transaction">
              {renderForm({createTransaction, classes, loading, error})}
            </Panel>
            {snackbar}
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateTransaction);
