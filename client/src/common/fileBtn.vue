<template>
  <span class="wrapper">
    <input type="file" ref="chat_file"  class="input" @change="handleChangeFile">
    <span class="iconfont" @click="handleClickFile">&#xe605;</span>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    handleClickFile() {
      this.$refs.chat_file.click()
    },
    handleChangeFile(e) {
      // let reader
      // if(window.FileReader) {
      //   reader = new FileReader();
      // } else {
      //   alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
      // }
      let file = e.target.files[0];

      let data = {
        file,
        // type: 'file',
        _this: this
      }

      // let imageType = /^image\//;         // 是否是图片
      // console.log(file)
      // console.log('1111')
      // if(imageType.test(file.type)) {
      //   // alert("请选择图片！");
      //   // return;
      //   data.type = 'img'
      // }

      // accept="image/jpeg,image/jpg,image/png,image/svg"
      
      
      this.client_sendComplex(data)

      // reader.onload = (e) => {
      //   // this.$socket.emit('client_img', {data: e.target.result})
      // };
      // reader.readAsDataURL(file);
    },
    ...mapMutations(['client_sendComplex'])
  }
}
</script>

<style lang="less">
  .wrapper {
    .iconfont {
      font-size: 24px;
      cursor: pointer;
      margin-right: 10px;
    }

    .input {
      display: none;
    }
  }
    
</style>
