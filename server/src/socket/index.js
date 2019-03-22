const receiveMsg = require('./function/receiveMsgFromSender.js')
const sendMsg = require('./function/sendMsgToReceiver.js')
const client_userList = require('./function/client_userList.js')
const client_msgList = require('./function/client_msgList.js')
const client_acceptFriend = require('./function/client_acceptFriend')

let hashList = {}
let unread = {}
let cache = {}

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
      client_userList(id, socket, unread[id])
    })

    socket.on('client_disconnect', (id) => {          // 客户端退出
      delete hashList[id]
      console.log(id, '退出连接')
    })

    socket.on('client_addFriend', (data) => {         // 添加好友
      if(hashList[data.receiveId]) {
        hashList[data.receiveId].emit('server_addFriend', data)
      }
      else {
        cache[data.receiveId] = data
      }
      console.log(cache)
    })

    socket.on('client_acceptFriend', (idList) => {       // 同意添加好友
      let socketList = [socket]
      if(hashList[idList[1]]) socketList.push(hashList[idList[1]])
      client_acceptFriend(idList, socketList)
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
