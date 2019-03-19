const { MongoClient, url } = require('../../../config.js')

module.exports = async function(id, socket) {
  let msg_list = await msgList(id)
  socket.emit('server_msgList', msg_list)
}

const msgList = (id) => {
  return new Promise((resolve, reject) => { 
    MongoClient.connect(url, (err, db) => {
      if(err) throw err
      const collection_user = db.db('weChat').collection('user')

      collection_user.find({id}).toArray((err, result) => {
        let roomMessage = result[0].roomMessage
        let msg_list = {}
        // console.log(roomMessage)
        let count = 0
        for(let i=0; i<roomMessage.length; i++) {
          let roomId = roomMessage[i].roomName
          db.db('weChat').collection(roomId).find({}).toArray((err, result) => {
            if(err) throw err
            msg_list[roomId] = result

            count += 1
            if(count == roomMessage.length) {
              resolve(msg_list)
            }
          })
        }
      })
    })
  })
}
