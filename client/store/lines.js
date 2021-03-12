import axios from 'axios'
import socket from '../socket'

const GOT_NEW_PROMPT = 'GOT_NEW_PROMPT'
const ADD_NEW_LINE = 'ADD_NEW_LINE'
const CHANGE_TURNS = 'CHANGE_TURNS'

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
export const addLine = lineToAdd => {
  try {
    socket.emit('new-line-to-add', lineToAdd)
    let poem = JSON.parse(localStorage.getItem('poem'))
    poem.lines.push(lineToAdd)
    localStorage.setItem('poem', JSON.stringify(poem))
  } catch (error) {
    console.log(error)
  }
}

//When user clicks pass, the line to pass is emitted to server socket
export const passLine = lineToPass => {
  try {
    socket.emit('new-line-to-pass', lineToPass)
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
