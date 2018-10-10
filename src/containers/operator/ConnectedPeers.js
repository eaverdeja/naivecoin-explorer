import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import Queries from '../../graphql/queries'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 9,
    marginLeft: theme.spacing.unit
  },
  list: {
    backgroundColor: theme.palette.grey[200]
  }
})

const connectedPeers = ({ classes }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Query query={Queries.CONNECTED_PEERS}>
          {({ loading, error, data }) => {
            let list = []
            if (error || loading) return null
            if (!loading && data) {
              data.connectedPeers.map(peer =>
                list.push(
                  <ListItem key={peer}>
                    <ListItemText primary={peer} />
                  </ListItem>
                )
              )
            } else {
              list = list.push(
                <ListItem button>
                  <ListItemText primary="No peers connected yet!" />
                </ListItem>
              )
            }
            return (
              <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                  Connected Peers
                </Typography>
                <List className={classes.list} component="nav">
                  {list}
                </List>
              </div>
            )
          }}
        </Query>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(connectedPeers)
