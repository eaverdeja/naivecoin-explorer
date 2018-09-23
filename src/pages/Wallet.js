import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import AddressList from '../containers/address/AddressList';
import CreateAddress from '../containers/address/CreateAddress';

const wallet = props => (
  <React.Fragment>
    <Typography variant="display1" align="center">
      Wallet Addresses
    </Typography>
    <AddressList walletId={props.match.params.walletId} {...props} />
    <CreateAddress walletId={props.match.params.walletId} />
  </React.Fragment>
);

export default wallet;
