const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { MongoClient, url } = require('../../config.js')

module.exports = (req, res, uploadPath) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    // console.log(files.file)
    let file = files.file
    let info = {
      sender: fields.sender,
      receiver: fields.receiver,
      date: fields.date,
      time: fields.time,
      type: fields.type
    }
    let roomId = fields.roomId
    let imgName = info.sender + fields.nowtime + path.extname(file.name)
    let newPath = path.join(uploadPath, imgName)
    info.msg = 'mock/chat_img/' + imgName

    data = {
      content: info,
      roomId
    }

    fs.rename(file.path, newPath, (err) => {
      if(err) throw err
      console.log('图片存储服务器成功')
      res.send(data)
    })
  })
}
