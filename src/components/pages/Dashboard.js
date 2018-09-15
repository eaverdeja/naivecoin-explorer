import React from 'react';
import LatestBlocks from '../../containers/blockchain/LatestBlocks';
import UnconfirmedTransactions from '../../containers/blockchain/UnconfirmedTransactions';
import BlockJsonTree from '../../containers/blockchain/BlockJsonTree';

const dashboard = () => (
  <React.Fragment>
    <LatestBlocks />
    <UnconfirmedTransactions />
    <BlockJsonTree />
  </React.Fragment>
);

export default dashboard;
