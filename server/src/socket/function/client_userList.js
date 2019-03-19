const { MongoClient, url } = require('../../../config.js')

module.exports = async function(id, socket, unread) {
  let user_list = await userList(id, unread)
  socket.emit('server_userList', user_list)
  delete unread
}

const userList = function userList(id, unread) {
  return new Promise((resolve, reject) => { 
    MongoClient.connect(url, (err, db) => {
      if(err) throw err
      const collection_user = db.db('weChat').collection('user')
      collection_user.find({id}).toArray((err, result) => {
        let roomMessage = result[0].roomMessage
        let count = 0

        for(let i=0; i<roomMessage.length; i++) {
          collection_user.find({id: roomMessage[i].chatWith}).toArray((err, result) => {

            
            let roomId = roomMessage[i].roomName
            let list_unread = 0
            if(unread) {
              list_unread = unread[roomId] === undefined ? 0 : unread[roomId]
            }
            // console.log('unread: ', list_unread)
            roomMessage[i].imgUrl = result[0].imgUrl
            roomMessage[i].name = result[0].name
            roomMessage[i].unread = list_unread

            count += 1
            if(count === roomMessage.length) {
              resolve(roomMessage)
            }
          })
        }
      })
    })
  })
}

