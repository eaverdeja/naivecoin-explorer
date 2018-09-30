import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import { Subscription } from 'react-apollo';
import Subscriptions from '../../graphql/subscriptions';
import DrawerTerminal from '../../components/UI/DrawerTerminal';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 9,
    marginLeft: theme.spacing.unit
  }
});

const serverLog = ({ classes }) => (
  <Grid container>
    <Grid item xs={12}>
      <Subscription subscription={Subscriptions.SERVER_LOG_UPDATE}>
        {({ loading, error, data }) => {
          if (error) return null;
          let terminal = null;
          if (!loading && data) {
            terminal = <DrawerTerminal output={data.serverLogUpdate} />;
          }

          return (
            <div className={classes.root}>
              <Typography variant="display1" gutterBottom>Server Log</Typography>
              {terminal}
            </div>
          );
        }}
      </Subscription>
    </Grid>
  </Grid>
);

export default withStyles(styles)(serverLog);
