import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TransactionSummary from '../transaction/TransactionSummary';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    flexGrow: 1
  },
  transaction: {
    '&:last-child': {
      marginBottom: theme.spacing.unit * 3
    }
  }
});

const blockTransactions = ({ transactions, classes }) => (
  <Paper className={classes.root}>
    <Typography variant="title" gutterBottom>
      Transactions
    </Typography>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        {transactions.map(tx => (
          <TransactionSummary
            key={tx.id}
            className={classes.transaction}
            transaction={tx}
          />
        ))}
        <Divider light />
      </Grid>
    </Grid>
  </Paper>
);

export default withStyles(styles)(blockTransactions);
