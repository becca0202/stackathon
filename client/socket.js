import io from 'socket.io-client'
import store from './store'
import {gotNewPrompt} from './store/lines'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

//client listens for a new prompt, then sends to store to update
socket.on('new-prompt', prompt => {
  store.dispatch(gotNewPrompt(prompt))
})

//client listens to update the poem and sends to store to update
socket.on('update-poem', line => {
  if (!localStorage.getItem('poem')) {
    const poem = {
      lines: []
    }
    localStorage.setItem('poem', JSON.stringify(poem)) // create poem for guest user
  }
  let poem = JSON.parse(localStorage.getItem('poem'))
  poem.lines.push(line)
  localStorage.setItem('poem', JSON.stringify(poem))
})

export default socket
