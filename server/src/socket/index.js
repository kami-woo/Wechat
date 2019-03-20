const receiveMsg = require('./function/receiveMsgFromSender.js')
const sendMsg = require('./function/sendMsgToReceiver.js')
const client_userList = require('./function/client_userList.js')
const client_msgList = require('./function/client_msgList.js')

let hashList = {}
let unread = {}

module.exports = (io) => {
  io.on('connection', async function(socket) {
    console.log('socket连接成功')
    // socket.emit('CONNECT', 'this is server')
    socket.on('client_msg', handleMessage)
    socket.on('client_id', (id) => {
      if(id) {
        hashList[id] = socket
        socket.id = id
        console.log(id)
      }
    })
    socket.emit('getClient_id')
    socket.on('disconnect', (() => {
      delete hashList[socket.id]
      console.log(socket.id, '退出连接')
    }))

    socket.on('client_msgList', (id) => {           // 获取信息列表
      client_msgList(id, socket)
    })

    socket.on('client_userList', (id) => {           // 获取用户列表
      console.log('--------')
      console.log(unread)
      client_userList(id, socket, unread[id])
    })

    socket.on('client_disconnect', (id) => {          // 客户端退出
      delete hashList[id]
      console.log(id, '退出连接')
    })

    async function handleMessage(data) {
      await receiveMsg(data)
      let receiver = data.content.receiver
      if(hashList[receiver]) {
        hashList[receiver].emit('serverMsg', data)
      } 
      else {
        if(unread[receiver]) {
          unread[receiver][data.roomId] += 1
        }
        else {
          unread[receiver] = {}
          unread[receiver][data.roomId] = 1
        }
      }
    }
  })
}
