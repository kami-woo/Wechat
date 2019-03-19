const { MongoClient, url } = require('../../config.js')
const createRoom = require('./createRoom.js')

module.exports = (data, res) => {
  // console.log(data)
  let list = data.idList
  MongoClient.connect(url, (err, db) => {
    if(err) throw err
    let col_user = db.db("weChat").collection('user')
    let roomName = 'room' + Date.now()
    for(let i=0; i<list.length; i++) {
      let obj = {
        id: list[i]
      }
      col_user.find(obj).toArray((err, result) => {                        // 查找id对应的用户信息
        result = result[0]
        if(i === 0) {
          roomName += result.id
        }
        let roomMessage = {
          roomName,
          chatWith: list[(i+1)%2]
        }

        let room = result.roomMessage                          // 修改roomMessage的值
        room.push(roomMessage)

        col_user.updateOne({ _id: result._id },{$set: result}, (err) => {         // 添加房间号到对应用户roomId中
          if(err) throw err
          console.log('文档更新成功')
          if(i) {
            createRoom(roomName, db, data)
            res.send('添加成功')
          }
        })
      })
    }
  })
  // res.send('hello')
}
