import React, { Component } from 'react';
import Terminal from 'terminal-in-react';

class DrawerTerminal extends Component {
  componentDidMount() {
    const terminal = document.getElementsByClassName('terminal-base')[0];
    terminal.firstChild.childNodes[1].style.overflowX = 'hidden';
  }

  componentDidUpdate(prevProps) {
    if (prevProps.output !== this.props.output) {
      console.log(this.props.output);
    }
  }

  render() {
    return <Terminal color="black" backgroundColor="white" hideTopBar />;
  }
}

export default DrawerTerminal;
