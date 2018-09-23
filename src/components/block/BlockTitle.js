import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade/Fade';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3
  },
  loading: {
    margin: theme.spacing.unit * 6,
    textAlign: 'center'
  },
  img: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius - 1,
    width: '100%',
    background: `
      linear-gradient(
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
      )
    `,
    backgroundImage:
      'url("https://source.unsplash.com/950x200/?nature,mountain,mine")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '200px',
    position: 'relative'
  },
  imgBanner: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    left: theme.spacing.unit,
    background: 'black',
    padding: theme.spacing.unit
  },
  imgText: {
    color: 'white'
  }
});

class BlockTitle extends Component {
  state = {
    loaded: false,
    image: null,
    url: 'https://source.unsplash.com/950x200/?mountain,mine,rock'
  };

  constructor(props) {
    super(props);
    this.imageContainer = React.createRef();
  }

  componentDidMount() {
    const image = new Image();
    image.src = this.state.url;
    image.onload = () =>
      this.setState({ loaded: true }, () => {
        this.imageContainer.current.style.backgroundImage = `url(${
          this.state.url
        })`;
      });

    this.setState({ image });
  }

  render() {
    const { index, hash, classes } = this.props;

    let title = (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

    if (this.state.loaded) {
      title = (
        <Fade in={this.state.loaded}>
          <div className={classes.img} ref={this.imageContainer}>
            <div className={classes.imgBanner}>
              <Typography className={classes.imgText} variant="title">
                Block #{index}
              </Typography>
              <Typography className={classes.imgText} variant="subheading">
                {hash}
              </Typography>
            </div>
          </div>
        </Fade>
      );
    }

    return title;
  }
}

export default withStyles(styles)(BlockTitle);
