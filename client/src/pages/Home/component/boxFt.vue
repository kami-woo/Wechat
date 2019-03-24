<template>
  <div class="box-ft">
    <div class="toolBar">
      <span class="iconfont">&#xe604;</span>
      <file-btn></file-btn>
      <voice-btn></voice-btn>
    </div>
    <textarea class="editArea" ref='editArea' @keyup.enter="sendMsg"></textarea>
    <div class="action">
      <Button class="btn-send" type="primary" @click="sendMsg">发送</Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import fileBtn from '../../../common/fileBtn.vue'
import voiceBtn from '../../../common/voiceBtn.vue'

export default {
  data() {
    return {
      isVoice: false
    }
  },
  components: {
    fileBtn,
    voiceBtn
  },
  methods: {
    sendMsg() {
      let editArea = this.$refs.editArea
      let msg = editArea.value
      if(!msg) return
      editArea.value = ''
      let date = new Date()
      
      let time = date.toTimeString().split(' ')[0]
      date = date.toLocaleDateString()
      let data = {
        content: {
          type: 'text',
          msg,
          sender: this.userInfo.id,
          receiver: this.roomInfo.chatId,
          date,
          time
        },
        roomId: this.roomInfo.roomId
      }
      this.$socket.emit('client_msg', data)
      this.senderMsgList(data)
    },
    ...mapMutations(['senderMsgList', 'client_sendImg'])
  },
  computed: {
    ...mapState(['roomInfo', 'userInfo'])
  },
}
</script>

<style lang="less">
  .box-ft {
    height: 180px;
    padding: 0 19px;
    position: relative;

    .toolBar {
      border-top: 1px solid #ccc;
      height: 40px;
      padding: 5px 3px;
    }

    .editArea {
      height: 84px;
      width: 100%;
      margin-top: 10px;
      background-color: #eee;
      outline: none;
      border: none;
      resize: none;
      font-size: 15px;
      line-height: 25px;
      font-family: 'songti';
    }

    .action {
      height: 30px;
      position: relative;

      .btn-send {
        position: absolute;
        width: 80px;
        right: 0;
      }
    }
  }
</style>
