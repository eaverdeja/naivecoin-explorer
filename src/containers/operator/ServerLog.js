import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import { Query } from 'react-apollo'
import Queries from '../../graphql/queries'
import ServerLogStream from './ServerLogStream'

const serverLog = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Query query={Queries.SERVER_LOG}>
          {({ loading, error, data }) => {
            let log = ''
            if (error || loading) return null
            if (!loading && data) {
              try {
                data.serverLog.split('\n').map(jsonPayload => {
                  if (jsonPayload.trim() !== '') {
                    const payload = JSON.parse(jsonPayload)
                    log += payload.message + '\n\n'
                  }
                })
              } catch (ex) {
                console.log(ex)
              }
            }
            return <ServerLogStream initialPayload={log} />
          }}
        </Query>
      </Grid>
    </Grid>
  )
}

export default serverLog
