import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import InputList from './InputList'
import OutputList from './OutputList'
import moment from 'moment'
import { hashResume } from '../../utils/index'

const styles = theme => ({
  card: {
    minWidth: '90%',
    marginTop: theme.spacing.unit * 2,
    '&:first-child': {
      marginTop: 0
    },
    '&:last-child': {
      marginBottom: theme.spacing.unit * 3
    }
  },
  transaction: {
    fontSize: '1.2rem',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer'
  },
  regularTx: {
    backgroundColor: '#cfd8dc'
  },
  feeTx: {
    backgroundColor: '#ffee58'
  },
  rewardTx: {
    backgroundColor: '#ef5350',
    color: 'white'
  },
  capitalize: {
    textTransform: 'capitalize'
  }
})

const transactionSummary = ({ transaction, classes, history }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <CardHeader
              className={classNames(classes.transaction, {
                [classes.regularTx]: transaction.type === 'regular',
                [classes.feeTx]: transaction.type === 'fee',
                [classes.rewardTx]: transaction.type === 'reward'
              })}
              title={hashResume(transaction.id, 16)}
              subheader={
                <React.Fragment>
                  <Typography variant="caption">
                    {`Mined at (fake for now!): ${moment().format(
                      'dddd, MMMM Do YYYY, h:mm:ss a'
                    )}`}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classNames(classes.capitalize, {
                      [classes.regularTx]: transaction.type === 'regular',
                      [classes.feeTx]: transaction.type === 'fee',
                      [classes.rewardTx]: transaction.type === 'reward'
                    })}
                  >
                    {transaction.type}
                  </Typography>
                </React.Fragment>
              }
              disableTypography
              onClick={() => history.push('/transactions/' + transaction.id)}
            />
          </Grid>
          <Grid item xs={6}>
            <InputList inputs={transaction.inputs} txId={transaction.id} />
          </Grid>
          <Grid item xs={6}>
            <OutputList outputs={transaction.outputs} txId={transaction.id} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(transactionSummary)
