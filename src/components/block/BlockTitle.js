import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3
  },
  img: {
    marginTop: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius - 1,
    width: '101%'
  }
});

const blockTitle = ({ index, hash, classes }) => (
  <Paper className={classes.root}>
    <Typography variant="title">Block #{index}</Typography>
    <Typography variant="subheading">{hash}</Typography>
    <img
      className={classes.img}
      src="https://source.unsplash.com/920x100/?nature,mountain,mine"
      alt=""
    />
  </Paper>
);

export default withStyles(styles)(blockTitle);
