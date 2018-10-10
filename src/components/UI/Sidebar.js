import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MemoryIcon from '@material-ui/icons/Memory'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import GroupWorkIcon from '@material-ui/icons/GroupWork'

const sidebar = ({ history }) => (
  <div>
    <ListItem button onClick={() => history.push('/')}>
      <ListItemIcon>
        <GroupWorkIcon onClick={() => history.push('/')} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => history.push('/blocks')}>
      <ListItemIcon>
        <DashboardIcon onClick={() => history.push('/blocks')} />
      </ListItemIcon>
      <ListItemText primary="Blocks" />
    </ListItem>
    <ListItem button onClick={() => history.push('/wallets')}>
      <ListItemIcon>
        <AccountBalanceWalletIcon onClick={() => history.push('/wallets')} />
      </ListItemIcon>
      <ListItemText primary="Wallets" />
    </ListItem>
    <ListItem button onClick={() => history.push('/operator')}>
      <ListItemIcon>
        <PersonIcon onClick={() => history.push('/operator')} />
      </ListItemIcon>
      <ListItemText primary="Operator" />
    </ListItem>
    <ListItem
      button
      onClick={() =>
        (window.location = `http://${
          process.env.REACT_APP_GRAPHQL_SERVER
        }:8000/graphql`)
      }
    >
      <ListItemIcon>
        <MemoryIcon
          onClick={() =>
            (window.location = `http://${
              process.env.REACT_APP_GRAPHQL_SERVER
            }:8000/graphql`)
          }
        />
      </ListItemIcon>
      <ListItemText primary="GQL Playground" />
    </ListItem>
  </div>
)

export default sidebar
