import io from 'socket.io-client'
import store from './store'
import {gotNewPrompt} from './store/lines'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

//REQUEST ROOM KEY
//after user hits 'request key' button
//emits an event to server to ask for code
export function requestRoomKey(callback) {
  socket.emit('getRoomCode')

  socket.on('roomCreated', function(roomKey) {
    return callback(roomKey)
  })
}

//CHECK ROOM CODE
//take input field and pass it to this function
export function joinRoom(key, callback) {
  const response = {key, message: ''}
  //then emit an event to server to ask if key is valid
  socket.emit('isKeyValid', key)

  //LISTEN FOR SERVER RESPONSE:
  socket.on('keyNotValid', function() {
    //send message to user
    response.key = null
    response.message = 'Invalid Key'
    return callback(response)
  })
  socket.on('keyIsValid', function(validKey) {
    socket.emit('joinRoom', validKey)
    response.key = validKey
    response.message = 'Game Joined!'
    return callback(response)
  })
  socket.on('gameAlreadyFull', function() {
    //send message to user
    response.key = null
    response.message = 'Game is Already Full'
    return callback(response)
  })
}

//client listens for a new prompt, then sends to store to update
socket.on('new-prompt', prompt => {
  store.dispatch(gotNewPrompt(prompt))
})

//client listens for when to update the poem and sets the new line to local storage
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
