import React, {Component} from 'react'
import {addLine, passLine} from '../store/lines'
import history from '../history'

export class NewMessageEntry extends Component {
  constructor() {
    super()
    this.state = {
      line1: '',
      line2: '',
      waitingForTurn: false
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // if (localStorage.getItem('poem')) {
    // if cart exists in localstorage grab poem and set to local state
    //   const totalPoem = JSON.parse(localStorage.getItem('poem'))
    // }
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
    this.setState({line1})
  }

  handleChange2(event) {
    const line2 = event.target.value
    this.setState({line2})
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
    console.log(this.props)
    return (
      <div>
        {!this.state.waitingForTurn ? (
          <form id="new-message-form" onSubmit={this.handleSubmit}>
            <div>
              <input
                // className="form-control"
                type="text"
                name="line1"
                placeholder="Start your poem"
                value={this.state.line1}
                onChange={this.handleChange1}
              />
              <input
                // className="form-control"
                type="text"
                name="line2"
                placeholder="Line to pass"
                value={this.state.line2}
                onChange={this.handleChange2}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  Pass!
                </button>
              </span>
            </div>
          </form>
        ) : (
          <div>
            <h1>Waiting for your partner...</h1>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
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
