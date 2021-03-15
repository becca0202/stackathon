import {requestRoomKey, joinRoom} from '../socket'
//  joinRoom => {key, message: ''}; key can be null
import React, {Component} from 'react'
import store, {gotRoomKey} from '../store'

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
    const username = evt.target.username.value
    joinRoom({key: roomKey, username}, response => {
      if (response.key) {
        store.dispatch(gotRoomKey(response.key))
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
        {/* <p className="search__title">Welcome to Line By Line</p> */}
        <button
          className="btn striped-shadow dark"
          type="button"
          onClick={this.handleClick}
        >
          Generate Room Key
        </button>
        <h1>{this.state.roomKey}</h1>
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <div className="search__container">
            <input
              className="search__input"
              type="text"
              name="roomKey"
              placeholder="Enter Room Key"
            />
            <input
              className="search__input"
              type="text"
              name="username"
              placeholder="Enter Your Name"
            />
          </div>
          <button className="btn striped-shadow dark" type="submit">
            Join Room
          </button>
        </form>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
