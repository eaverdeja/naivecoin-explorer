import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import Panel from '../../components/UI/Panel';
import Queries from '../../graphql/queries'

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

const walletList = ({ classes, history }) => (
  <Query query={Queries.GET_WALLETS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <Panel title="Wallets">
          <List
            subheader={
              <ListSubheader component="div">Current Wallet IDs</ListSubheader>
            }
          >
            {data.wallets.map(wallet => (
              <React.Fragment key={wallet.id}>
                <Divider light />
                <ListItem
                  onClick={() => history.push('wallets/' + wallet.id)}
                  className={classes.listItem}
                >
                  <ListItemText primary={wallet.id} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Panel>
      );
    }}
  </Query>
);

export default withStyles(styles)(walletList);
