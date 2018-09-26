import React, { Component } from 'react';
import { Query, Mutation, Subscription } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Panel from '../../components/UI/Panel';
import Mutations from '../../graphql/mutations';
import Subscriptions from '../../graphql/subscriptions';
import { hashResume } from '../../utils';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  button: {
    marginLeft: theme.spacing.unit * 3
  },
  loading: {
    margin: theme.spacing.unit * 6,
  }
});

class MineBlock extends Component {
  state = {
    mining: false,
    notifying: false
  }

  handleMineBlock = mineBlock => {
    mineBlock();
    this.setState({ mining: true })
  };

  handleMinedBlock = () => this.setState({ mining: false, notifying: true })

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ notifying: false })
  };

  render() {
    const { classes } = this.props;

    const MinedBlockSnackbar = ({ index, hash }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={this.state.notifying}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={
          <span>
            Mined block with Index: {index} & Hash:{' '}
            {hashResume(hash)}
          </span>
        }
      />
    );

    return (
      <Mutation
        mutation={Mutations.MINE_BLOCK}
        variables={{
          rewardAddress:
            'fd4a2c20d7d9125b008180e426b12bc758ecf2990f8ba9cee9afa3e722f7d2c8'
        }}
        onCompleted={this.handleMinedBlock}
      >
        {(mineBlock, { loading, error }) => (
          <React.Fragment>
            <Panel className={classes.root} title="Mine Block">
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => this.handleMineBlock(mineBlock)}
              >
                Mine
              </Button>
            </Panel>
            <Subscription subscription={Subscriptions.BLOCK_MINED}>
              {({ data, loading }) => {
                if (loading && this.state.mining) return (
                  <div className={classes.loading}>
                    <CircularProgress />
                  </div>
                );
                if (loading || !data) return null;

                const { blockMined } = data;
                const { index, hash } = blockMined;
                
                return (
                  <MinedBlockSnackbar
                    index={index}
                    hash={hash} />
                )
              }}
            </Subscription>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(MineBlock);
