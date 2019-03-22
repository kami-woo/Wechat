module.exports = (roomName, db, list) => {
  let db_wechat = db.db('weChat')
  let obj = {
    idList: list,
    roomId: roomName
  }
  db_wechat.collection('roomMembers').insertOne(obj, function (err, res) {
    if (err) throw err;
    console.log("创建集合!");
    db.close();
  });
}
