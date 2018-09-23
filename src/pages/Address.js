import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import AddressSummary from '../containers/address/AddressSummary';
import AddressTransactions from '../containers/address/AddressTransactions';

const address = props => (
  <React.Fragment>
    <Typography variant="display1" align="center">
      Address
    </Typography>
    <AddressSummary {...props} />
    <AddressTransactions {...props} />
  </React.Fragment>
);

export default address;
