import React from 'react'
import Typography from '@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles'
import Subscriptions from '../../graphql/subscriptions'
import DrawerTerminal from '../../components/UI/DrawerTerminal'
import { Subscription } from 'react-apollo'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 9,
    marginLeft: theme.spacing.unit
  }
})

const serverLogStream = ({ initialPayload, classes }) => (
  <Subscription subscription={Subscriptions.SERVER_LOG_UPDATE}>
    {({ loading, error, data }) => {
      if (error) return null
      let log = initialPayload || ''
      if (!loading && data) {
        log += data.serverLogUpdate + '\n\n'
      }

      return (
        <div className={classes.root}>
          <Typography variant="display1" gutterBottom>
            Server Log
          </Typography>
          <DrawerTerminal output={log} />
        </div>
      )
    }}
  </Subscription>
)

export default withStyles(styles)(serverLogStream)
