const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const path = require('path')
// const MongoClient = require('mongodb').MongoClient
// const url = "mongodb://localhost:27017/runoob"
const handleLogin = require('./src/http/handleLogin.js')
const queryUser = require('./src/http/queryUser.js')
const addBuddy = require('./src/http/addBuddy.js')
const uploadImg = require('./src/http/uploadImg.js')
const getRoom = require('./src/http/getRoom.js')
const client_sendImg = require('./src/http/client_sendImg.js')
const handleSocket = require('./src/socket/index.js')

const app = express()
let server = require('http').createServer(app)
let io = socket.listen(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// let unread = {}

const rootPath = __dirname

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/home', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  handleLogin(req.body, res)
})

app.post('/queryUser', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  queryUser(req.body, res)
})

app.post('/addBuddy', (req, res) => {
  addBuddy(req.body, res)
})

app.post('/uploadImg', (req, res) => {
  let uploadPath = path.join(rootPath, '../','my-wechat/public/mock/img')
  uploadImg(req, res, uploadPath)
})

app.post('/client_sendImg', (req, res) => {                    // 处理用户发送图片
  let uploadPath = path.join(rootPath, '../','my-wechat/public/mock/chat_img')
  client_sendImg(req, res, uploadPath)
})

// app.post('/getRoom', (req, res) => {
//   let id = req.body
//   console.log(unread)
//   getRoom(id, res, unread[id])
// })

// const server = app.listen(3000, () => {
//   console.log('3000端口启动\n')
// })
server.listen(3000)

console.log('--------------')

handleSocket(io)

// getRoom('tcp1552235178430', 1)
