const { MongoClient, url } = require('../../config.js')

module.exports = (loginData, res) => {
  let user = {
    account: loginData.user_account,
    password: loginData.user_password
  }
  MongoClient.connect(url, (err, db) => {
    if(err) throw err
    let dbo = db.db("weChat")
    if(loginData.isRegister) {
      dbo.collection('user').find(user).toArray((err, result) => {
        if(err) throw err
        if(result.length) {
          result = result[0]
          let data = {
            success: true,
            userMessage: {
              name: result.name,
              account: result.account,
              id: result.id,
              imgUrl: result.imgUrl
            }
          }
          res.send(data)
        } 
        else {
          let data = {
            success: false
          }
          res.send(data)
        }
        db.close()
      })
    }
    else {
      user.name = loginData.user_name
      user.id = user.account + Date.now()
      user.imgUrl = 'mock/init.jpg'
      user.roomMessage = []
      dbo.collection('user').insertOne(user, (err, result) => {
        if(err) throw err
        res.send('注册成功')
        db.close()
      })
    }
  })
}