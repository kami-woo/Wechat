module.exports = (data, socket) => {
  socket.emit('serverMsg', data)
}
