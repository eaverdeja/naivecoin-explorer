import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import CreateTransaction from '../containers/transactions/CreateTransaction'

const operator = props => (
  <React.Fragment>
    <Typography variant="display1" align="center">
      Operator
    </Typography>
    <CreateTransaction />
  </React.Fragment>
);

export default operator;
