import React from 'react';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import { withStyles } from '@material-ui/core/styles';
import Panel from '../../components/UI/Panel';
import TransactionSummary from '../../components/transaction/TransactionSummary';
import Queries from '../../graphql/queries';

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
  },
  content: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit
  }
});

const addressTransactions = ({ match, classes, ...rest }) => (
  <Query
    query={Queries.GET_TRANSACTIONS_BY_ADDRESS}
    variables={{ address: match.params.address }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const order = ['reward', 'fee', 'regular'];
      const transactions = data.getTransactionsByAddress;
      const sortedTransactions = [...transactions].sort(
        (a, b) => (order.indexOf(a.type) < order.indexOf(b.type) ? -1 : 1)
      );
      return (
        <Panel title="Transactions">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              {sortedTransactions.length ? (
                sortedTransactions.map(transaction => (
                  <TransactionSummary
                    {...rest}
                    key={transaction.id}
                    className={classes.transaction}
                    transaction={transaction}
                  />
                ))
              ) : (
                <Typography>No transactions for this address</Typography>
              )}
            </Grid>
          </Grid>
        </Panel>
      );
    }}
  </Query>
);

export default withStyles(styles)(addressTransactions);
