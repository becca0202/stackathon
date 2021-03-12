import React, {Component} from 'react'
import {NewMessageEntry} from '../components'
import {connect} from 'react-redux'

export class Workspace extends Component {
  render() {
    console.log('WORKSPACE PROPS', this.props)
    return (
      <NewMessageEntry
        prompt={this.props.newPrompt}
        ismyTurn={this.props.isMyTurn}
      />
    )
  }
}

const mapState = state => {
  return {newPrompt: state.lines.prompt, isMyTurn: state.lines.isMyTurn}
}

export default connect(mapState)(Workspace)
