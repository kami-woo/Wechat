const { MongoClient, url } = require('../../config.js')

module.exports = (name, res) => {
  MongoClient.connect(url, (err, db) => {
    if(err) throw err
    let dbo = db.db("weChat")
    dbo.collection('user').find(name).toArray((err, result) => {
      if(err) throw err
      if(result.length) {
        let data = {
          success: true,
          userMessage: []
        }
        for (let i=0; i<result.length; i++) {
          let userItem = {
            name: result[i].name,
            id: result[i].id,
            imgUrl: result[i].imgUrl,
            account: result[i].account
          }
          data.userMessage.push(userItem)
        }
        res.send(data)
      }
      else res.send({success: false})
      db.close()
    })
  })
}
