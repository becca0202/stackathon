import axios from 'axios'
import socket from '../socket'

const GOT_NEW_PROMPT = 'GOT_NEW_PROMPT'
const ADD_NEW_LINE = 'ADD_NEW_LINE'

export const gotNewPrompt = prompt => {
  return {
    type: GOT_NEW_PROMPT,
    prompt
  }
}

export const addLineToPoem = newLine => {
  return {
    type: ADD_NEW_LINE,
    newLine
  }
}

//   try {
//     let poem = JSON.parse(localStorage.getItem('poem'))
//     poem.lines.push(newLine)
//     localStorage.setItem('poem', JSON.stringify(poem))
//   } catch (error) {
//     console.log(error)
//   }

//when user clicks pass, the completed line1 is emitted to server socket
export const addLine = (lineToAdd, roomKey) => {
  const data = {lineToAdd, roomKey}
  try {
    socket.emit('new-line-to-add', data)
    let poem = JSON.parse(localStorage.getItem('poem'))
    poem.lines.push(lineToAdd)
    localStorage.setItem('poem', JSON.stringify(poem))
  } catch (error) {
    console.log(error)
  }
}

//When user clicks pass, the line to pass is emitted to server socket
export const passLine = (lineToPass, roomKey) => {
  const data = {lineToPass, roomKey}
  try {
    socket.emit('new-line-to-pass', data)
  } catch (error) {
    console.log(error)
  }
}

const initialState = {prompt: '', isMyTurn: false}

export default function promptReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_NEW_PROMPT:
      return {prompt: action.prompt, isMyTurn: true}
    default:
      return state
  }
}
