import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { hashResume } from '../../utils';
import Panel from '../UI/Panel';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    flexGrow: 1
  },
  content: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit
  }
});

const blockSummary = ({ block, classes }) => (
  <Panel className={classes.root} title="Block Summary">
    <Paper className={classes.content}>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="# of Transactions" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {block.transactions.length}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="Height" />
              <ListItemSecondaryAction>
                <Typography variant="caption">{block.index}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="Timestamp" />
              <ListItemSecondaryAction>
                <Typography variant="caption">{block.timestamp}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="Previous block" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {hashResume(block.previousHash, 8)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="Merkle Root" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {hashResume(block.merkleRoot, 8)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="Difficulty" />
              <ListItemSecondaryAction>
                <Typography variant="caption">{block.difficulty}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="Nonce" />
              <ListItemSecondaryAction>
                <Typography variant="caption">{block.nonce}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  </Panel>
);

export default withStyles(styles)(blockSummary);
