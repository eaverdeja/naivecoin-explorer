import React from 'react'
import Typography from '@material-ui/core/Typography/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import CreateTransaction from '../containers/transactions/CreateTransaction'
import MineBlock from '../containers/operator/MineBlock'

const operator = props => (
  <React.Fragment>
    <Typography variant="display1" align="center">
      Operator
    </Typography>
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <CreateTransaction />
      </Grid>
      <Grid item xs={6}>
        <MineBlock />
      </Grid>
    </Grid>
  </React.Fragment>
)

export default operator
