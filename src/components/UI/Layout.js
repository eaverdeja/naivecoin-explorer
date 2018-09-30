import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ServerLog from '../../containers/operator/ServerLog';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  paperDrawerClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  serverLogDrawer: {
    width: theme.spacing.unit * 60,
  },
  serverLogDrawerClose: {
    width: theme.spacing.unit
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit,
    height: '100vh',
    overflowX: 'auto'
  }
});

const theme = createMuiTheme({
  palette: {
    accent2Color: '#455a64',
    accent3Color: '#ff9800',
    accent1Color: '#64ffda',
    canvasColor: '#607d8b'
  },
  paper: {
    backgroundColor: '#00838f'
  },
  typography: {
    htmlFontSize: 15
  }
});

class Layout extends Component {
  state = {
    sidebarOpen: false,
    serverLogOpen: true
  };

  handleDrawerOpen = () => {
    this.setState({ sidebarOpen: true, serverLogOpen: false });
  };

  handleDrawerClose = () => {
    this.setState({ sidebarOpen: false, serverLogOpen: true });
  };

  render() {
    const { classes, children } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.sidebarOpen && classes.appBarShift
            )}
          >
            {' '}
            <Toolbar
              disableGutters={!this.state.sidebarOpen}
              className={classes.toolbar}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.sidebarOpen && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Naivecoin
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.sidebarOpen && classes.paperDrawerClose
              )
            }}
            open={this.state.sidebarOpen}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <Route path="/" component={Sidebar} />
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
          <Drawer
            variant="permanent"
            anchor="right"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                classes.serverLogDrawer,
                !this.state.serverLogOpen && classes.serverLogDrawerClose,
                !this.state.serverLogOpen && classes.paperDrawerClose
              )
            }}
            open={this.state.serverLogOpen}
          >
            <div className={classes.serverLog}>
              <ServerLog />
            </div>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Layout);
