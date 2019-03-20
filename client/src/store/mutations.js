import axios from 'axios'

export default {
  userMessage(state, data) {
    let userInfo = state.userInfo
    state.isLogin = true
    userInfo.name = data.name
    userInfo.id = data.id
    userInfo.account = data.account
    userInfo.imgUrl = data.imgUrl

    sessionStorage.setItem('state', JSON.stringify(state))
  },
  handleEnterRoom(state, data) {
    let roomInfo = {
      name: data.name,
      chatUrl: data.imgUrl,
      roomId: data.roomName,
      chatId: data.chatWith,
    }

    state.roomInfo = roomInfo
    changeUnread(state, data.roomName, false)

    sessionStorage.setItem('state', JSON.stringify(state))
  },
  handleLogout(state, data) {
    state.isLogin = false
    state.roomInfo = {}
    state.roomList = []

    sessionStorage.setItem('state', '')
  },
  imgMessage(state, data) {                                // 更换，上传头像
    let formData = new FormData()
    formData.append('file', data)
    formData.append('id', state.userInfo.id)

    axios.post('/api/uploadImg', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((res) => {
      state.userInfo.imgUrl = res.data
      sessionStorage.setItem('state', JSON.stringify(state))
    }).catch((err) => {
      console.log(err)
    })
  },
  SOCKET_serverMsg(state, data) {                          // 同时在线，发送信息
    let content = data.content
    delete content._id
    let msgList = state.msgList
    if(!msgList[data.roomId]) {
      msgList[data.roomId] = []
    }
    msgList[data.roomId].push(content)

    if(data.roomId != state.roomInfo.roomId)
      changeUnread(state, data.roomId, true)
    
    sessionStorage.setItem('state', JSON.stringify(state))
  },
  senderMsgList(state, data) {                              // 发送者添加消息到msgList
    let content = data.content
    let msgList = state.msgList
    if(!msgList[data.roomId]) 
      msgList[data.roomId] = []
    msgList[data.roomId].push(content)
    
    sessionStorage.setItem('state', JSON.stringify(state))
  },
  SOCKET_server_msgList(state, data) {                       // 接收信息列表
    state.msgList = data
  },
  SOCKET_server_userList(state, data) {                      // 接收用户列表，并处理unread值
    let roomList = state.roomList
    // console.log(data)
    if(roomList.length) {
      for(let i=0; i<data.length; i++) {
        let num = roomList[i] == undefined ? 0 : roomList[i].unread
        roomList[i] = data[i]
        roomList[i].unread += num
      }
    }
    else state.roomList = data
  },
  client_sendImg(state, data) {                              // 用户发送图片
    let formData = new FormData()
    formData.append('file', data.file)

    let date = new Date()
    let time = date.toTimeString().split(' ')[0]
    date = date.toLocaleDateString()

    formData.append('type', 'img')
    formData.append('sender', state.userInfo.id)
    formData.append('receiver', state.roomInfo.chatId)
    formData.append('date', date)
    formData.append('time', time)
    formData.append('roomId', state.roomInfo.roomId)
    formData.append('nowtime', Date.now())


    axios.post('/api/client_sendImg', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((res) => {
      // state.userInfo.imgUrl = res.data
      // console.log(res)
      // sessionStorage.setItem('state', JSON.stringify(state))
      data._this.$socket.emit('client_msg', res.data)
      // delete res.data._id
      // console.log(res.data)
      state.msgList[res.data.roomId].push(res.data.content)
    }).catch((err) => {
      console.log(err)
    })
  }
}

const changeUnread = (state, roomId, opt) => {               // 处理unread值
  let roomList = state.roomList
  for (let i=0; i<roomList.length; i++) {
    if(roomList[i].roomName === roomId) {
      if(opt)
        roomList[i].unread += 1
      else
        roomList[i].unread = 0
      break
    }
  }
}
