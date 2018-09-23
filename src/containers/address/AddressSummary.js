import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import Panel from '../../components/UI/Panel';
import Typography from '@material-ui/core/Typography/Typography';
import Queries from '../../graphql/queries';

const styles = theme => ({
  content: {
    padding: theme.spacing.unit
  }
});

const addressSummary = ({ match, classes }) => (
  <Query query={Queries.GET_ADDRESS_SUMMARY} variables={{ address: match.params.address }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const addressSummary = data.getAddressSummary
      return (
        <Panel title="Summary">
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className={classes.content}>
                <List>
                  <ListItem>
                    <ListItemText primary="Balance" />
                    <ListItemSecondaryAction>
                      <Typography variant="caption">{addressSummary.balance}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Total Sent" />
                    <ListItemSecondaryAction>
                      <Typography variant="caption">{addressSummary.totalSent}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Total Received" />
                    <ListItemSecondaryAction>
                      <Typography variant="caption">{addressSummary.totalReceived}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="# of Unspent outputs" />
                    <ListItemSecondaryAction>
                      <Typography variant="caption">{addressSummary.unspentOutputs.length}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
              <Divider light />
            </Grid>
          </Grid>
        </Panel>
      );
    }}
  </Query>
);

export default withStyles(styles)(addressSummary);
