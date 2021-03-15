import React, {Component} from 'react'
import {addLine, passLine} from '../store/lines'
import {isTyping1, isTyping2, readyToPublish} from '../socket'
import history from '../history'

export class NewMessageEntry extends Component {
  constructor() {
    super()
    this.state = {
      line1: '',
      line2: '',
      waitingForTurn: false,
      isTypingMessage: ''
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.prompt) {
      this.setState({
        line1: this.props.prompt,
        waitingForTurn: true
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.prompt && this.props.prompt !== prevProps.prompt) {
      this.setState({
        line1: this.props.prompt,
        waitingForTurn: this.props.isMyTurn
      })
    }
  }

  handleChange1(event) {
    const line1 = event.target.value
    const key = {key: this.props.roomKey}
    this.setState({line1})
    isTyping1(key, message => {
      this.setState({isTypingMessage: message})
    })
  }

  handleChange2(event) {
    const line2 = event.target.value
    const key = {key: this.props.roomKey}
    this.setState({line2})
    isTyping2(key, message => {
      this.setState({isTypingMessage: message})
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!localStorage.getItem('poem')) {
      const poem = {
        lines: []
      }
      localStorage.setItem('poem', JSON.stringify(poem)) // create poem for guest user
    }
    addLine(this.state.line1, this.props.roomKey)
    passLine(this.state.line2, this.props.roomKey)
    this.setState({line1: '', line2: '', waitingForTurn: true})
  }

  render() {
    console.log('state----->', this.state)
    return (
      <div>
        <p className="search__title">Start your poem</p>
        {!this.state.waitingForTurn ? (
          <form id="new-message-form" onSubmit={this.handleSubmit}>
            <div className="search__container">
              <input
                className="poem__line"
                type="text"
                name="line1"
                placeholder="Start your poem"
                value={this.state.line1}
                onChange={this.handleChange1}
              />
              <input
                className="poem__line"
                type="text"
                name="line2"
                placeholder="Line to pass"
                value={this.state.line2}
                onChange={this.handleChange2}
              />
              <span className="input-group-btn">
                <button className="button1" type="submit">
                  Pass!
                </button>
              </span>
            </div>
          </form>
        ) : (
          <div>
            <h1>{this.state.isTypingMessage}</h1>
          </div>
        )}
        <button
          className="button1"
          type="button"
          onClick={() => {
            // readyToPublish(this.props.roomKey, message => {
            //   this.setState({isTypingMessage: message})
            // })
            history.push('/publish')
          }}
        >
          Publish
        </button>
      </div>
    )
  }
}

// const mapState = state => {
//   return {prompt: state.lines.prompt}
// }

// export default connect(mapState)(NewMessageEntry)
