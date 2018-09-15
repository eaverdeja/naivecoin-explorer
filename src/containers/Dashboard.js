import React from 'react';
import LatestBlocks from '../components/Blockchain/LatestBlocks';
import UnconfirmedTransactions from '../components/Blockchain/UnconfirmedTransactions';
import BlockJsonTree from '../components/Blockchain/BlockJsonTree';

const dashboard = () => (
  <React.Fragment>
    <LatestBlocks />
    <UnconfirmedTransactions />
    <BlockJsonTree />
  </React.Fragment>
);

export default dashboard;
