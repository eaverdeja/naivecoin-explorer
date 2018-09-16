import React from 'react';
import LatestBlocks from '../../containers/blockchain/LatestBlocks';
import UnconfirmedTransactions from '../../containers/transactions/UnconfirmedTransactions';
import BlockJsonTree from '../../containers/blockchain/BlockJsonTree';

const dashboard = props => (
  <React.Fragment>
    <LatestBlocks {...props} />
    <UnconfirmedTransactions />
    <BlockJsonTree />
  </React.Fragment>
);

export default dashboard;
