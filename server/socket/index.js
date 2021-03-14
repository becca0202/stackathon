function codeGenerator() {
  let code = ''
  let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

//object with list of active game rooms
const gameRooms = {
  //[roomKey] : {roomKey: key, numOfPlayers: 0}
  //example ---> A6XY: {roomKey: A6XY}
}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('joinRoom', roomKey => {
      gameRooms[roomKey].numPlayers++
      socket.join(roomKey)
      console.log(`${socket.id} joined room ${roomKey}`)
    })

    socket.on('getRoomCode', function() {
      let key = codeGenerator()
      //re-generate key if it matches with an existing one
      while (Object.keys(gameRooms).includes(key)) {
        key = codeGenerator()
      }
      //add room key to dictionary of existing rooms
      gameRooms[key] = {
        roomKey: key,
        numPlayers: 0
      }
      socket.emit('roomCreated', key)
    })

    socket.on('isKeyValid', function(keyToCheck) {
      if (
        Object.keys(gameRooms).includes(keyToCheck) &&
        gameRooms[keyToCheck].numPlayers >= 2
      ) {
        socket.emit('gameAlreadyFull')
      } else if (Object.keys(gameRooms).includes(keyToCheck)) {
        socket.emit('keyIsValid', keyToCheck)
      } else {
        socket.emit('keyNotValid')
      }
    })

    //server listens for new line and sends it to all clients as a new prompt
    socket.on('new-line-to-pass', data => {
      const prompt = data.lineToPass
      const key = data.roomKey
      socket.to(key).emit('new-prompt', prompt)
    })

    //server listens for line to add to poem and sends it to all clients
    socket.on('new-line-to-add', data => {
      const line = data.lineToAdd
      const key = data.roomKey
      socket.to(key).emit('update-poem', line)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      //Ability to rejoin room:
      //add user socket to gameRm info
      //check for user info in game rooms
      //decrease numOfPlayers
      //emit info to other people in the room
    })
  })
}
