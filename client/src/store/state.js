let init = {
  isLogin: false,
  changeBg: -1,
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
    id: '',
    account: ''
  },
  re_cardInfo: {           // 接受
    isShow: false,
    imgUrl: '',
    name: '',
    addition: '',
    account: ''
  },
  showInfoCard: false,
}

let state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : init


export default state
