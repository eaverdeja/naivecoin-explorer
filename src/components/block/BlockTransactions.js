import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Panel from '../UI/Panel';
import TransactionSummary from '../transaction/TransactionSummary';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    flexGrow: 1
  }
});

const blockTransactions = ({ transactions, classes, ...rest }) => (
  <Panel className={classes.root} title="Transactions">
    <Grid container spacing={24}>
      <Grid item xs={12}>
        {transactions.map(tx => (
          <TransactionSummary
            {...rest}
            key={tx.id}
            transaction={tx}
          />
        ))}
      </Grid>
    </Grid>
  </Panel>
);

export default withStyles(styles)(blockTransactions);
