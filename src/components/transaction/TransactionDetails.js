import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'
import Panel from '../../components/UI/Panel'
import { hashResume } from '../../utils/index'

const styles = theme => ({
  content: {
    padding: theme.spacing.unit
  },
  capitalize: {
    textTransform: 'capitalize'
  }
})

const transactionDetails = ({ transaction, classes }) => (
  <Panel title="Details">
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <Paper className={classes.content}>
          <List>
            <ListItem>
              <ListItemText primary="ID" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {hashResume(transaction.id)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Hash" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {hashResume(transaction.hash)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Type" />
              <ListItemSecondaryAction>
                <Typography className={classes.capitalize} variant="caption">
                  {transaction.type}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="# of Inputs" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {transaction.data.inputs.length || 'Newly generated coins'}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="# of Outputs" />
              <ListItemSecondaryAction>
                <Typography variant="caption">
                  {transaction.data.outputs.length}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <Divider light />
      </Grid>
    </Grid>
  </Panel>
)

export default withStyles(styles)(transactionDetails)
