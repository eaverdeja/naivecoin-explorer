import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Panel from '../../components/UI/Panel';
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';
import { hashResume } from '../../utils/index';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  button: {
    marginLeft: theme.spacing.unit * 3
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    minWidth: 150
  }
});

class CreateTransaction extends Component {
  state = {
    notifying: false,
    lastCreatedTransaction: null
  };

  validateForm(values) {
    let errors = {};
    return errors;
    if (!values.password) {
      errors.password = true;
    }
    return errors;
  }

  handleTransactionCreation = res =>
    this.setState({
      notifying: true,
      lastCreatedTransaction: res.createTransaction.id
    });

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ notifying: false });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { classes } = this.props;

    const selectWallet = field => (
      <Query query={Queries.GET_WALLETS}>
        {({ loading, error, data }) =>
          !loading &&
          !error && (
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="walletId-label-placeholder">
                Wallet ID
              </InputLabel>
              <Select
                {...field}
                value={field.value || ''}
                input={
                  <Input name="walletId" id="walletId-label-placeholder" />
                }
                displayEmpty
                name="walletId"
                className={classes.selectEmpty}
              >
                {data.wallets.map(wallet => (
                  <MenuItem key={wallet.id} value={wallet.id}>
                    {hashResume(wallet.id, 6)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }
      </Query>
    );

    const selectFromAddress = (field, form) => (
      <Query
        query={Queries.GET_ADDRESSES}
        variables={{ id: form.values.walletId }}
        skip={!form.values.walletId}
      >
        {({ loading, error, data }) => {
          let options = (
            <MenuItem value="">
              <em>Select a Wallet</em>
            </MenuItem>
          );

          if (!loading && !error && !data.wallet.addresses.length) {
            options = (
              <MenuItem value="">
                <em>No addresses for this wallet!</em>
              </MenuItem>
            );
          }

          if (!loading && !error && data.wallet.addresses.length) {
            options = data.wallet.addresses.map(address => (
              <MenuItem key={address} value={address}>
                {hashResume(address, 6)}
              </MenuItem>
            ));
          }

          return (
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="fromAddress-label-placeholder">
                From Address
              </InputLabel>
              <Select
                {...field}
                value={field.value || ''}
                input={
                  <Input
                    name="fromAddress"
                    id="fromAddress-label-placeholder"
                  />
                }
                name="fromAddress"
                className={classes.selectEmpty}
              >
                {options}
              </Select>
            </FormControl>
          );
        }}
      </Query>
    );

    const password = field => (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          name="password"
          value={field.value || ''}
          onChange={field.onChange}
        />
      </FormControl>
    );

    const toAddress = field => (
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel htmlFor="toAddress">To Address</InputLabel>
        <Input
          name="toAddress"
          value={field.value || ''}
          onChange={field.onChange}
        />
      </FormControl>
    );

    const amount = field => (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          type="number"
          name="amount"
          value={field.value || ''}
          onChange={field.onChange}
        />
      </FormControl>
    );

    const renderForm = ({ createTransaction, classes, loading, error }) => (
      <Formik
        validate={this.validateForm}
        onSubmit={(formValues, { setSubmitting }) => {
          const {
            walletId,
            password,
            fromAddress,
            toAddress,
            amount
          } = formValues;
          createTransaction({
            variables: {
              walletId,
              password,
              fromAddress,
              toAddress,
              amount
            }
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
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Field
                  name="walletId"
                  render={({ field }) => selectWallet(field)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="fromAddress"
                  render={({ field, form }) => selectFromAddress(field, form)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  render={({ field }) => password(field)}
                />
              </Grid>
              <Grid item xs={8}>
                <Field
                  name="toAddress"
                  render={({ field }) => toAddress(field)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field name="amount" render={({ field }) => amount(field)} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || loading}
                >
                  Submit
                </Button>
              </Grid>
              {error && <p>Error :( Please try again</p>}
            </Grid>
          </Form>
        )}
      </Formik>
    );

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
    );

    return (
      <Mutation
        mutation={Mutations.CREATE_TRANSACTION}
        onCompleted={this.handleTransactionCreation}
      >
        {(createTransaction, { loading, error }) => (
          <React.Fragment>
            <Panel className={classes.root} title="Create Transaction">
              {renderForm({ createTransaction, classes, loading, error })}
            </Panel>
            {snackbar}
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateTransaction);
