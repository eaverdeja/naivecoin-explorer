import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import BlockTitle from '../../components/block/BlockTitle';
import BlockSummary from '../../components/block/BlockSummary';
import BlockTransactions from '../../components/block/BlockTransactions';
import Queries from '../../graphql/queries'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  }
});

const block = ({ classes, match, ...rest }) => (
  <Query query={Queries.GET_BLOCK} variables={{ hash: match.params.blockHash }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const block = data.getBlockByHash
      return (
        <div className={classes.root}>
          <BlockTitle index={block.index} hash={block.hash} />
          <BlockSummary block={block} />
          <BlockTransactions {...rest} transactions={block.transactions} />
        </div>
      );
    }}
  </Query>
);

export default withStyles(styles)(block);
