import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { hashResume } from '../../utils';
import moment from 'moment'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

const GET_UNCONFIRMED_TRANSACTIONS = gql`
  query {
    unconfirmedTransactions {
      id
      hash
      type
      inputs {
        transaction
        index
        amount
        address
        signature
      }
      outputs {
        amount
        address
      }
    }
  }
`;

const unconfirmedTransactions = ({
  transactions,
  classes,
  limit = 5,
  pollInterval = 3000
}) => {
  return (
    <Query query={GET_UNCONFIRMED_TRANSACTIONS} pollInterval={pollInterval}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <div className={classes.root}>
            <Typography variant="display1" gutterBottom>
              Unconfirmed Transactions
            </Typography>
            <Typography variant="caption" gutterBottom>
              Last update: {moment().format("DD/MM/YYYY, h:mm:ss")}
            </Typography>
            <Paper>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Total amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.unconfirmedTransactions
                    .slice(-limit)
                    .reverse()
                    .map(unconfirmedTx => (
                      <TableRow
                        className={classes.row}
                        key={unconfirmedTx.hash}
                      >
                        <TableCell>{hashResume(unconfirmedTx.hash)}</TableCell>
                        <TableCell>{unconfirmedTx.type}</TableCell>
                        <TableCell>
                          {unconfirmedTx.outputs.reduce(
                            (prev, curr) => prev + curr.amount,
                            0
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(unconfirmedTransactions);
