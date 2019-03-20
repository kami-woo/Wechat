export default {
  newMsg: (state) => (roomId) => {
    return state.msgList[roomId][state.msgList[roomId].length-1]
  },
  userMsg(state) {
    return state.msgList[state.roomInfo.roomId]
  }
}