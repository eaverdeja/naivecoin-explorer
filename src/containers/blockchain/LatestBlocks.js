import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider/Divider';
import Button from '@material-ui/core/Button/Button';
import { Query } from 'react-apollo';
import { hashResume } from '../../utils';
import moment from 'moment';
import Panel from '../../components/UI/Panel';
import Queries from '../../graphql/queries'

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      cursor: 'pointer'
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing.unit
  }
});

const latestBlocks = ({
  blocks,
  classes,
  limit = 3,
  pollInterval = 3000,
  history
}) => (
  <Query query={Queries.GET_LATEST_BLOCKS} pollInterval={pollInterval}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <Panel title="Latest Blocks">
          <Typography variant="caption" gutterBottom>
            Last update: {moment().format('DD/MM/YYYY, h:mm:ss')}
          </Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Height</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Nº of Transactions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.blocks
                  .slice(-limit)
                  .reverse()
                  .map(block => (
                    <TableRow
                      onClick={() => history.push('blocks/' + block.hash)}
                      className={classes.row}
                      key={block.hash}
                    >
                      <TableCell>{block.index}</TableCell>
                      <TableCell>{hashResume(block.hash)}</TableCell>
                      <TableCell>
                        {moment.unix(block.timestamp).fromNow()}
                      </TableCell>
                      <TableCell>{block.transactions.length}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Divider />
            <div className={classes.actions}>
              <Button variant="outlined" className={classes.button}>
                See all blocks
              </Button>
            </div>
          </Paper>
        </Panel>
      );
    }}
  </Query>
);

export default withStyles(styles)(latestBlocks);
