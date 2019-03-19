const { MongoClient, url } = require('../../config.js')

module.exports = function(id, res, unread) {
  console.log('getRoom', unread)
  MongoClient.connect(url, (err, db) => {
    if(err) throw err
    const collection_user = db.db('weChat').collection('user')
    collection_user.find(id).toArray((err, result) => {
      let roomMessage = result[0].roomMessage
      let count = 0
      for(let i=0; i<roomMessage.length; i++) {
        collection_user.find({id: roomMessage[i].chatWith}).toArray((err, result) => {

          let list_unread = 0
          let roomId = roomMessage[i].roomName
          if(unread) {
            list_unread = unread[roomId] === undefined ? 0 : unread[roomId]
          }
          // console.log(result)
          roomMessage[i].imgUrl = result[0].imgUrl
          roomMessage[i].name = result[0].name
          roomMessage[i].unread = list_unread

          count += 1
          if(count === roomMessage.length) {
            console.log(roomMessage)
            res.send({
              success: true,
              data: roomMessage
            })
          }
        })
      }
    })
  })
}
