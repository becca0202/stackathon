module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    //server listens for new line and sends it to all clients as a new prompt
    socket.on('new-line-to-pass', prompt => {
      socket.broadcast.emit('new-prompt', prompt)
    })

    //server listens for line to add to poem and sends it to all clients
    socket.on('new-line-to-add', line => {
      socket.broadcast.emit('update-poem', line)
    })
  })
}
