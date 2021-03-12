const SET_ROOM_KEY = 'SET_ROOM_KEY'

export const gotRoomKey = key => {
  return {
    type: SET_ROOM_KEY,
    key
  }
}

// export const setRoomKey = (key) => {
//   return (dispatch) => {
//     try {
//       dispatch(gotRoomKey(key))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

const initialState = {}

export default function roomReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_KEY:
      return action.key
    default:
      return state
  }
}
