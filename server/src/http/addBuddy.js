const { MongoClient, url } = require('../../config.js')
const createRoom = require('./createRoom.js')

module.exports = (data, res) => {
  // console.log(data)
  let list = data.idList
  MongoClient.connect(url, (err, db) => {
    if(err) throw err
    let col_user = db.db("weChat").collection('user')
    let roomName = 'room' + Date.now() + list[0]

    let count = 0
    for(let i=0; i<list.length; i++) {
      let obj = {
        id: list[i]
      }
      col_user.find(obj).toArray((err, result) => {                        // 查找id对应的用户信息
        let roomMessage = {
          roomName,
          chatWith: list[(i+1)%2]
        }

        result = result[0]
        result.roomMessage.push(roomMessage)                          // 修改roomMessage的值

        col_user.updateOne({ _id: result._id },{$set: result}, (err) => {         // 添加房间号到对应用户roomId中
          if(err) throw err

          count += 1
          console.log('文档更新成功')

          if(count == 2) {
            createRoom(roomName, db, list)
            res.send('添加成功')
          }
        })
      })
    }
  })
  // res.send('hello')
}
