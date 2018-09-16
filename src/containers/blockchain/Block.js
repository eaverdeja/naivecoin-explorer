import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import BlockTitle from '../../components/block/BlockTitle';
import BlockSummary from '../../components/block/BlockSummary';
import BlockTransactions from '../../components/block/BlockTransactions';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  }
});

const GET_BLOCK = gql`
  query getBlockByHash($hash: String!) {
    getBlockByHash(hash: $hash) {
      index
      nonce
      previousHash
      merkleRoot
      difficulty
      timestamp
      hash
      transactions {
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
  }
`;

const block = ({ classes, match }) => (
  <Query query={GET_BLOCK} variables={{ hash: match.params.blockHash }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const block = data.getBlockByHash
      return (
        <div className={classes.root}>
          <BlockTitle index={block.index} hash={block.hash} />
          <Divider />
          <BlockSummary block={block} />
          <Divider />
          <BlockTransactions transactions={block.transactions} />
        </div>
      );
    }}
  </Query>
);

export default withStyles(styles)(block);
