import React, { Component } from 'react'
import Terminal from 'terminal-in-react'

class DrawerTerminal extends Component {
  componentDidMount() {
    const terminal = document.getElementsByClassName('terminal-base')[0]
    terminal.firstChild.childNodes[1].style.overflowX = 'hidden'
  }

  render() {
    return (
      <Terminal
        style={{
          fontSize: '1.1em'
        }}
        color="black"
        backgroundColor="white"
        hideTopBar
        watchConsoleLogging={false}
        plugins={this.props.plugins}
      />
    )
  }
}

export default DrawerTerminal
