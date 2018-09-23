import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import ReactJson from 'react-json-view';
import Panel from '../../components/UI/Panel';
import Queries from '../../graphql/queries';

const styles = theme => ({
  jsonTree: {
    width: '100%',
    maxHeight: '70vh',
    overflowY: 'auto',
    padding: theme.spacing.unit * 3
  }
});

const blockJsonTree = ({ blocks, classes, limit = 2, depth = 0 }) => {
  return (
    <Query query={Queries.GET_ALL_BLOCKS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const omitTypename = (key, value) =>
          key === '__typename' ? undefined : value;
        const blocks = JSON.parse(JSON.stringify(data.blocks), omitTypename);

        return (
          <Panel title="All Blocks (JSON view)">
            <Paper className={classes.jsonTree}>
              <ReactJson collapsed={depth} src={blocks} />
            </Paper>
          </Panel>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(blockJsonTree);
