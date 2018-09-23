import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

const sidebar = ({ history }) => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <GroupWorkIcon onClick={() => history.push('/')} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" onClick={() => history.push('/')} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountBalanceWalletIcon onClick={() => history.push('/wallets')} />
      </ListItemIcon>
      <ListItemText primary="Wallets" onClick={() => history.push('/wallets')} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Operator" onClick={() => history.push('/operator')} />
    </ListItem>
  </div>
);

export default sidebar;
