import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Panel from '../../components/UI/Panel';
import Snackbar from '@material-ui/core/Snackbar';
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  field: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    marginLeft: theme.spacing.unit * 3
  }
});

class CreateWallet extends Component {
  state = {
    notifying: false,
    lastCreatedWallet: null
  };

  updateCache(
    cache,
    {
      data: { createWallet }
    }
  ) {
    const { wallets } = cache.readQuery({ query: Queries.GET_WALLETS });
    cache.writeQuery({
      query: Queries.GET_WALLETS,
      data: { wallets: wallets.concat([createWallet]) }
    });
  }

  validateForm(values) {
    let errors = {};
    if (!values.password) {
      errors.password = true;
    }
    return errors;
  }

  handleWalletCreation = res =>
    this.setState({
      notifying: true,
      lastCreatedWallet: res.createWallet.id
    });

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ notifying: false });
  };

  renderForm = ({ createWallet, classes, loading, error }) => (
    <Formik
      initialValues={{ password: '' }}
      validate={this.validateForm}
      onSubmit={({ password }, { setSubmitting }) => {
        createWallet({ variables: { password } });
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
            className={classes.field}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
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
  );

  render() {
    const { classes } = this.props;

    let snackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={this.state.notifying}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={
          <span>Wallet created with ID: {this.state.lastCreatedWallet}</span>
        }
      />
    );

    return (
      <Mutation
        mutation={Mutations.CREATE_WALLET}
        update={this.updateCache}
        onCompleted={this.handleWalletCreation}
      >
        {(createWallet, { loading, error }) => (
          <React.Fragment>
            <Panel className={classes.root} title="Create Wallet">
              {this.renderForm({ createWallet, loading, error, classes })}
            </Panel>
            {snackbar}
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateWallet);
