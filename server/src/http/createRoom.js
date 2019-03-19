module.exports = (roomName, db, membersObj) => {
  let db_wechat = db.db('weChat')
  let obj = {
    idList: membersObj.idList,
    roomId: roomName
  }
  db_wechat.collection('roomMembers').insertOne(obj, function (err, res) {
    if (err) throw err;
    console.log("创建集合!");
    db.close();
  });
}
