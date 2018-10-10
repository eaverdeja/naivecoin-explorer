import React, { Component } from 'react'
import { Mutation, Subscription } from 'react-apollo'
import { Formik, Form, Field } from 'formik'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid/Grid'
import Panel from '../../components/UI/Panel'
import Mutations from '../../graphql/mutations'
import Subscriptions from '../../graphql/subscriptions'
import { hashResume } from '../../utils'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  field: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 320
  },
  button: {
    marginLeft: theme.spacing.unit * 3
  },
  loading: {
    margin: theme.spacing.unit * 6
  }
})

class MineBlock extends Component {
  state = {
    mining: false,
    notifying: false
  }

  handleMineBlock = () => {
    this.setState({ mining: true })
  }

  handleMinedBlock = () => this.setState({ mining: false, notifying: true })

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ notifying: false })
  }

  render() {
    const { classes } = this.props

    const renderForm = ({ mineBlock, loading, error }) => (
      <Formik
        initialValues={{ rewardAddress: '', feeAddress: '' }}
        validate={this.validateForm}
        onSubmit={({ rewardAddress, feeAddress }, { setSubmitting }) => {
          mineBlock({ variables: { rewardAddress, feeAddress } })
          this.handleMineBlock()
          setSubmitting(false)
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Field
                  name="rewardAddress"
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={classes.field}
                      value={field.value.rewardAddress}
                      type="text"
                      placeholder="Reward Address"
                      error={errors.rewardAddress && touched.rewardAddress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="feeAddress"
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={classes.field}
                      value={field.value.feeAddress}
                      type="text"
                      placeholder="Fee Address"
                      error={errors.feeAddress && touched.feeAddress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || loading}
                >
                  Mine
                </Button>
              </Grid>
              {error && <p>{error.message}</p>}
            </Grid>
          </Form>
        )}
      </Formik>
    )

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
            Mined block with Index: {index} & Hash: {hashResume(hash)}
          </span>
        }
      />
    )

    return (
      <Mutation
        mutation={Mutations.MINE_BLOCK}
        onCompleted={this.handleMinedBlock}
      >
        {(mineBlock, { loading, error }) => (
          <React.Fragment>
            <Panel className={classes.root} title="Mine Block">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  {renderForm({ mineBlock, loading, error })}
                </Grid>
              </Grid>
            </Panel>
            <Subscription subscription={Subscriptions.BLOCK_MINED}>
              {({ data, loading }) => {
                if (loading && this.state.mining)
                  return (
                    <div className={classes.loading}>
                      <CircularProgress />
                    </div>
                  )
                if (loading || !data) return null

                const { blockMined } = data
                const { index, hash } = blockMined

                return <MinedBlockSnackbar index={index} hash={hash} />
              }}
            </Subscription>
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}

export default withStyles(styles)(MineBlock)
