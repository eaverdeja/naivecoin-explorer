import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  }
});

const panel = ({ title, classes, children }) => (
  <React.Fragment>
    <div className={classes.root}>
      <Typography variant="headline" gutterBottom>
        {title}
      </Typography>
      {children}
    </div>
  </React.Fragment>
);

export default withStyles(styles)(panel);
