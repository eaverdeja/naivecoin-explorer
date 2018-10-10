import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import Queries from '../../graphql/queries'
import Subscriptions from '../../graphql/subscriptions'
import ApolloSubscriptionPlugin from './ApolloSubscriptionPlugin'
import { Typography } from '@material-ui/core'
import DrawerTerminal from '../../components/UI/DrawerTerminal'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit
  }
})

const serverLog = ({ classes }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Query query={Queries.SERVER_LOG}>
          {({ loading, error, data, subscribeToMore }) => {
            let log = []
            if (error || loading) return null
            if (!loading && data) {
              try {
                // eslint-disable-next-line
                data.serverLog.split('\n').map(jsonPayload => {
                  if (jsonPayload.trim() !== '') {
                    const payload = JSON.parse(jsonPayload)
                    log.push(payload.message + '\n')
                  }
                })
              } catch (ex) {
                console.log(ex)
              }
            }

            const apolloPlugin = {
              class: ApolloSubscriptionPlugin,
              config: {
                boot: printLine => log.map(printLine),
                more: subscribe =>
                  subscribe(
                    Subscriptions.SERVER_LOG_UPDATE,
                    'serverLogUpdate',
                    subscribeToMore
                  )
              }
            }

            return (
              <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                  Server Log
                </Typography>
                <DrawerTerminal plugins={[apolloPlugin]} />
              </div>
            )
          }}
        </Query>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(serverLog)
