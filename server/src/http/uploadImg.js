const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const { MongoClient, url } = require('../../config.js')

module.exports = (req, res, uploadPath) => {
  let form = new formidable.IncomingForm()
  console.log(uploadPath)

  form.parse(req, (err, fields, files) => {
    // console.log(files.file)
    let file = files.file
    let id = fields.id
    let imgName = id + path.extname(file.name)
    let newPath = path.join(uploadPath, imgName)

    fs.rename(file.path, newPath, (err) => {
      if(err) throw err
      MongoClient.connect(url, (err, db) => {
        if(err) throw err
        let dbUser = db.db('weChat').collection('user')
        dbUser.find({id}).toArray((err, result) => {
          if(err) throw err
          result = result[0]
          result.imgUrl = 'mock/img/' + imgName
          dbUser.updateOne({ id: result.id }, {$set: result}, (err) => {
            if(err) throw err
            console.log('头像路径写入成功')
            res.send(result.imgUrl)
          })
        })
      })
      // res.send('hello')
    })
  })
}
