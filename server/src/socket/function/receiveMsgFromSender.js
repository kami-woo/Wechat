const { MongoClient, url } = require('../../../config.js')

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if(err) throw err
      const collection_room = db.db('weChat').collection(data.roomId)
      collection_room.insertOne(data.content, (err, res) => {
        if(err) throw err
        db.close()
        resolve()
      })
    })
  })
}
