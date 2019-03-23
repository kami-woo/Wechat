<template>
  <div class="box-ft">
    <div class="toolBar">
      <input type="file" ref="chat_file" accept="image/jpeg,image/jpg,image/png,image/svg" class="input" @change="handleChangeFile">
      <span class="iconfont">&#xe604;</span>
      <span class="iconfont" @click="handleClickFile">&#xe605;</span>
    </div>
    <textarea class="editArea" ref='editArea' @keyup.enter="sendMsg"></textarea>
    <div class="action">
      <Button class="btn-send" type="primary" @click="sendMsg">发送</Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    handleClickFile() {
      this.$refs.chat_file.click()
    },
    handleChangeFile(e) {
      let reader
      if(window.FileReader) {
        reader = new FileReader();
      } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
      }
      let file = e.target.files[0];
      let imageType = /^image\//;         // 是否是图片
      if(!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
      }
      
      let data = {
        file,
        _this: this
      }
      this.client_sendImg(data)

      reader.onload = (e) => {
        // this.$socket.emit('client_img', {data: e.target.result})
      };
      reader.readAsDataURL(file);
    },
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

    .toolBar {
      border-top: 1px solid #ccc;
      height: 40px;
      padding: 5px 3px;

      .iconfont {
        font-size: 24px;
        cursor: pointer;
        margin-right: 10px;
      }

      .input {
        display: none;
      }
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
