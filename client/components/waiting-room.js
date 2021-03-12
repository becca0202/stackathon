import {requestRoomKey, joinRoom} from '../socket'
//  joinRoom => {key, message: ''}; key can be null
import React, {Component} from 'react'

export class WaitingRoom extends Component {
  constructor() {
    super()
    this.state = {
      roomKey: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('clicked!')
    requestRoomKey(roomKey => {
      this.setState({
        roomKey
      })
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const roomKey = evt.target.roomKey.value
    joinRoom(roomKey, response => {
      if (response.key) {
        this.props.history.push('/home')
      } else {
        this.setState({
          message: response.message
        })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h3>Welcome to PoetryPass!</h3>
        <button type="button" onClick={this.handleClick}>
          Generate Room Key
        </button>
        <h1>{this.state.roomKey}</h1>
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <div>
            <input
              // className="form-control"
              type="text"
              name="roomKey"
              placeholder="Enter Room Key"
            />
          </div>
          <button type="submit">Join Room</button>
        </form>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
