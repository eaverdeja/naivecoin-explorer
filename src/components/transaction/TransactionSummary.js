import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import InputList from './InputList';
import OutputList from './OutputList';
import moment from 'moment';

const styles = theme => ({
  card: {
    minWidth: '90%',
    marginTop: theme.spacing.unit * 2
  },
  transaction: {
    fontSize: '1.2rem',
    borderRadius: theme.shape.borderRadius
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
  }
});

const transactionSummary = ({ transaction, classes, className }) => {
  return (
    <Card className={className + ' ' + classes.card}>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <CardHeader
              className={classNames(classes.transaction, {
                [classes.regularTx]: transaction.type === 'regular',
                [classes.feeTx]: transaction.type === 'fee',
                [classes.rewardTx]: transaction.type === 'reward'
              })}
              title={`ID | ${transaction.id}`}
              subheader={
                <Typography variant="caption">
                  {`Mined at (fake for now!): ${moment().format(
                    'dddd, MMMM Do YYYY, h:mm:ss a'
                  )}`}
                </Typography>
              }
              disableTypography
            />
          </Grid>
          <Grid item xs={6}>
            <InputList inputs={transaction.inputs} />
          </Grid>
          <Grid item xs={6}>
            <OutputList outputs={transaction.outputs} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(transactionSummary);
