import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import Panel from '../../components/UI/Panel';
import Typography from '@material-ui/core/Typography/Typography';

const styles = theme => ({
  listItem: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100]
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      cursor: 'pointer'
    }
  }
});

const addressList = ({ walletId, classes, history }) => (
  <Query query={Queries.GET_ADDRESSES} variables={{ id: walletId }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const addresses = data.wallet.addresses;
      const addressList = addresses.length ? (
        <List
          subheader={
            <ListSubheader component="div">
              Current Wallet Addresses
            </ListSubheader>
          }
        >
          {addresses.map(address => (
            <React.Fragment key={address}>
              <Divider light />
              <ListItem
                className={classes.listItem}
                onClick={() =>
                  history.push('/address/' + address + '/details')
                }
              >
                <ListItemText primary={address} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography>No addresses for this wallet</Typography>
      );

      return <Panel title="Addresses">{addressList}</Panel>;
    }}
  </Query>
);

export default withStyles(styles)(addressList);
