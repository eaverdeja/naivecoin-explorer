import React, { Component } from 'react'
import Terminal from 'terminal-in-react'

class DrawerTerminal extends Component {
  constructor() {
    super()
    this.terminalRef = React.createRef()
  }

  componentDidMount() {
    this.terminalRef.current.runCommandOnActive('clear')
    const terminal = document.getElementsByClassName('terminal-base')[0]
    terminal.firstChild.childNodes[1].style.overflowX = 'hidden'
    //The <Terminal> component listens to console.log() by default
    console.log(this.props.output)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.output !== this.props.output) {
      //The <Terminal> component listens to console.log() by default
      console.log(this.props.output)
    }
  }

  render() {
    return (
      <Terminal
        ref={this.terminalRef}
        color="black"
        backgroundColor="white"
        hideTopBar
      />
    )
  }
}

export default DrawerTerminal
