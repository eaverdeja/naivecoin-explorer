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
import { hashResume } from '../../utils';
import moment from 'moment'
import Panel from '../../components/UI/Panel';
import Queries from '../../graphql/queries'

const styles = theme => ({
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

const unconfirmedTransactions = ({
  transactions,
  classes,
  limit = 5,
  pollInterval = 3000
}) => {
  return (
    <Query query={Queries.GET_UNCONFIRMED_TRANSACTIONS} pollInterval={pollInterval}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <Panel title="Unconfirmed Transactions">
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
          </Panel>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(unconfirmedTransactions);
