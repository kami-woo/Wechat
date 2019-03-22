const { MongoClient, url } = require('../../../config.js')
const client_userList = require('./client_userList')

module.exports = async function(idList, socketList) {
  let roomName = await addFriendToDb(idList)
  await createRoom(roomName, idList)
  for(let i=0; i<socketList.length; i++) {
    client_userList(idList[i], socketList[i], '')
  }
}

addFriendToDb = (list) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if(err) throw err
      let col_user = db.db("weChat").collection('user')
      let roomName = 'room' + Date.now() + list[0]

      let count = 0
      for(let i=0; i<list.length; i++) {
        col_user.find({id: list[i]}).toArray((err, result) => {                        // 查找id对应的用户信息
          let roomMessage = {
            roomName,
            chatWith: list[(i+1)%2]
          }

          result = result[0]
          result.roomMessage.push(roomMessage)                          // 修改roomMessage的值

          col_user.updateOne({ id: result.id },{$set: result}, (err) => {         // 添加房间号到对应用户roomId中
            if(err) throw err

            count += 1
            console.log('文档更新成功')

            if(count == 2) {
              resolve(roomName)
              db.close()
            }
          })
        })
      }
    })
  })
}

const createRoom = (roomName, list) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      let db_wechat = db.db('weChat')
      let obj = {
        idList: list,
        roomId: roomName
      }
      db_wechat.collection('roomMembers').insertOne(obj, function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        resolve()
        db.close();
      });
    })
  }) 
}