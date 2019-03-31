import axios from 'axios'
import Vue from 'vue'

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
    let item = data.item
    let index = data.index

    let roomInfo = {
      name: item.name,
      chatUrl: item.imgUrl,
      roomId: item.roomName,
      chatId: item.chatWith,
    }

    state.changeBg = index
    state.roomInfo = roomInfo
    changeUnread(state, item.roomName, false)

    sessionStorage.setItem('state', JSON.stringify(state))
  },
  handleLogout(state, data) {
    state.isLogin = false
    state.roomInfo = {
      name: ''
    }
    state.roomList = []

    sessionStorage.setItem('state', '')
  },
  imgMessage(state, data) {                                // 更换，上传头像
    let formData = new FormData()
    formData.append('file', data)
    formData.append('id', state.userInfo.id)
    formData.append('imgUrl', state.userInfo.imgUrl)
    // state.userInfo.imgUrl = 'mock/change.png'

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
    if(!msgList[data.roomId]) {
      msgList[data.roomId] = []
    }
    msgList[data.roomId].push(content)
    
    sessionStorage.setItem('state', JSON.stringify(state))
  },
  SOCKET_server_msgList(state, data) {                       // 接收信息列表
    state.msgList = data
  },
  SOCKET_server_userList(state, data) {                      // 接收用户列表，并处理unread值
    let roomList = state.roomList
    for(let i=0; i<data.length; i++) {
      if(roomList[i])
        data[i].unread += roomList[i].unread
      // else state.msgList[data[i].roomName] = []
      else Vue.set(state.msgList, data[i].roomName, [])     /////// 保证增加的数组响应式
    }
    state.roomList = data
    // console.log(state.roomList)
    sessionStorage.setItem('state', JSON.stringify(state))
  },
  client_sendComplex(state, data) {                              // 用户发送图片
    let formData = new FormData()
    formData.append('file', data.file,)

    let date = new Date()
    let time = date.toTimeString().split(' ')[0]
    date = date.toLocaleDateString()

    // formData.append('type', data.type)
    formData.append('sender', state.userInfo.id)
    formData.append('receiver', state.roomInfo.chatId)
    formData.append('date', date)
    formData.append('time', time)
    formData.append('roomId', state.roomInfo.roomId)
    formData.append('nowtime', Date.now())
    formData.append('duration', data.duration)


    axios.post('/api/client_sendComplex', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((res) => {
      data._this.$socket.emit('client_msg', res.data)

      if(!state.msgList[res.data.roomId]) {
        Vue.set(state.msgList, res.data.roomId, [])
      }
      state.msgList[res.data.roomId].push(res.data.content)
    }).catch((err) => {
      console.log(err)
    })
  },
  handleShowCard(state, data) {
    state.cardInfo = {
      isShow: true,
      id: data.id,
      imgUrl: data.imgUrl,
      name: data.name,
      account: data.account
    }
  },
  handleHiddenCard(state) {
    state.cardInfo.isShow = false
  },
  SOCKET_server_addFriend(state, data) {                   // 好友在线，发送验证消息
    console.log(data)
    state.re_cardInfo = {
      isShow: true,
      imgUrl: data.imgUrl,
      name: data.name,
      addition: data.addition,
      id: data.sendId,
      account: data.account
    }
  },
  handleHiddenReCard(state) {
    state.re_cardInfo.isShow = false
  },
  handleShowInfoCard(state, data) {
    state.showInfoCard = data
    sessionStorage.setItem('state', JSON.stringify(state))
  },
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
