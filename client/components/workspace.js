import React, {Component} from 'react'
import {NewMessageEntry} from '../components'
import {connect} from 'react-redux'
import {getRandomPoem} from '../store/lines'

export class Workspace extends Component {
  render() {
    console.log('WORKSPACE PROPS', this.props)
    return (
      <div>
        <NewMessageEntry
          prompt={this.props.newPrompt}
          ismyTurn={this.props.isMyTurn}
          roomKey={this.props.roomKey}
        />
        <button type="button" onClick={() => this.props.inspireMe()}>
          Inspire Me
        </button>
        {this.props.randomPoem.lines ? (
          <div>
            <p>
              <i>"{this.props.randomPoem.lines[0]}"</i>
            </p>
            <p>
              {this.props.randomPoem.author}, "{this.props.randomPoem.title}"
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    newPrompt: state.lines.prompt,
    isMyTurn: state.lines.isMyTurn,
    roomKey: state.room,
    randomPoem: state.lines.randomPoem
  }
}

const mapDispatch = dispatch => {
  return {
    inspireMe: () => dispatch(getRandomPoem())
  }
}

export default connect(mapState, mapDispatch)(Workspace)
