import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import LatestBlocks from '../containers/blockchain/LatestBlocks';
import UnconfirmedTransactions from '../containers/transactions/UnconfirmedTransactions';
import BlockJsonTree from '../containers/blockchain/BlockJsonTree';

const dashboard = props => (
  <React.Fragment>
    <Typography variant="display1" align="center">
      Dashboard
    </Typography>
    <LatestBlocks {...props} />
    <UnconfirmedTransactions />
    <BlockJsonTree />
  </React.Fragment>
);

export default dashboard;
