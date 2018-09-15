import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactJson from 'react-json-view';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  jsonTree: {
    width: '100%',
    maxHeight: '70vh',
    overflowY: 'auto',
    padding: theme.spacing.unit * 3
  }
});

const GET_ALL_BLOCKS = gql`
  query {
    blocks {
      index
      nonce
      previousHash
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
`

const blockJsonTree = ({ blocks, classes, limit = 2, depth = 0 }) => {
  return (
    <Query
      query={GET_ALL_BLOCKS}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const omitTypename = (key, value) =>
          key === '__typename' ? undefined : value;
        const blocks = JSON.parse(JSON.stringify(data.blocks), omitTypename);

        return (
          <div className={classes.root}>
            <Typography variant="display1" gutterBottom>
              All Blocks (JSON view)
            </Typography>
            <Paper className={classes.jsonTree}>
              <ReactJson collapsed={depth} src={blocks} />
            </Paper>
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(blockJsonTree);
