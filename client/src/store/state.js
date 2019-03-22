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
  msgList: {},
  cardInfo: {
    isShow: false,
    imgUrl: '',
    name: '',
    id: ''
  },
  re_cardInfo: {           // 接受
    isShow: false,
    imgUrl: '',
    name: '',
    addition: '',
  }
}

let state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : init


export default state
