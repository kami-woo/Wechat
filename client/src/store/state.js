let init = {
  isLogin: false,
  userInfo: {
    name: '',
    account: '',
    id: '',
    imgUrl: ''
  },
  roomInfo: {
    roomId: '',
    name: '',
    chatUrl: '',
    chatId: '',
  },
  roomList: [],
  msgList: {}
}

let state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : init


export default state
