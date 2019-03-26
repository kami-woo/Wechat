const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { MongoClient, url } = require('../../config.js')

module.exports = (req, res, uploadPath) => {
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    // console.log(files.file)
    let file = files.file

    let size = ''
    if(file.size) {
      size = file.size / 1024
      size = size/1024 > 1 ? ((size/1024).toFixed(1))+'MB' : size.toFixed(1)+'KB'
    }
    

    let info = {
      sender: fields.sender,
      receiver: fields.receiver,
      date: fields.date,
      time: fields.time,
      type: fields.type,
      duration: fields.duration,
      unique: fields.sender + fields.nowtime,
      name: file.name,
      size
    }

    let imageType = /^image\//
    let audioType = /^audio\//

    let fileName = ''
    if(imageType.test(file.type)) {
      info.type = 'img'
      fileName = 'chat_img'
    }
    else if(audioType.test(file.type)) {
      info.type = 'mp3'
      fileName = 'chat_voice'
      file.name += '.mp3'
    }
    else {
      info.type = 'file'
      fileName = 'chat_file'
    }

    let roomId = fields.roomId
    let imgName = info.unique + info.name
    let newPath = path.join(uploadPath, fileName, imgName)


    info.msg = `mock/${fileName}/${imgName}`

    data = {
      content: info,
      roomId
    }

    fs.rename(file.path, newPath, (err) => {
      if(err) throw err
      console.log('文件存储服务器成功')
      res.send(data)
    })
  })
}
