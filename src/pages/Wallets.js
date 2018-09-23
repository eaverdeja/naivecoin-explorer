import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import WalletList from '../containers/wallets/WalletList';
import CreateWallet from '../containers/wallets/CreateWallet';

const wallet = props => (
  <React.Fragment>
    <Typography variant="display1" align="center">
      Wallets
    </Typography>
    <WalletList {...props} />
    <CreateWallet />
  </React.Fragment>
);

export default wallet;
