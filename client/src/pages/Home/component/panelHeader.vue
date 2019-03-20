<template>
  <div class="headerWrap">
    <div class="header">
      <img class="img" :src="imgUrl" ref="user_img" @click="handleInputClick"></img>
      <input type="file" class="upload_img" ref="upload_img" accept="image/jpeg,image/jpg,image/png,image/svg" @change="handleChangeImg"/>
      <div class="name">{{ userName }}</div>
      <span class="iconfont" ref="iconfont" @click="handleIconfontClick">&#xe631;</span>
    </div>
    <div class="menuWrap" :class="{hidden: isActive}">
      <div class="menu-item" @click="handleClickOut">
        <span class="iconfont">&#xe600;</span>
        退出
      </div>
      <div class="menu-item">
        <span class="iconfont">&#xe601;</span>
        意见反馈
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  props: ['chatList'],
  data() {
    return {
      userName: '',
      imgUrl: '',
      isActive: true,
      menuList: [{title: '退出'}],
    }
  },
  methods: {
    handleInputClick() {
      this.$refs.upload_img.click()
    },
    handleChangeImg(e) {
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
      
      this.imgMessage(file)

      reader.onload = (e) => {
        let img = this.$refs.user_img
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    handleIconfontClick() {
      this.isActive = false
    },
    handleBodyClick(e) {
      if(e.target !== this.$refs.iconfont) {
        this.isActive = true
      }
    },
    handleClickOut() {
      this.$socket.emit('client_disconnect', this.userInfo.id)
      this.handleLogout()
      this.$router.push('/login')
    },
    ...mapMutations(['handleLogout', 'imgMessage'])
  },
  computed: mapState(['userInfo']),
  mounted() {
    this.userName = this.userInfo.name
    this.imgUrl = this.userInfo.imgUrl
    document.addEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="less">
  .headerWrap {
    position: relative;
    .header {
      box-sizing: border-box;
      height: 76px;
      padding: 20px;
      display: flex;

      .iconfont {
        font-size: 20px;
        color: #888;
        cursor: pointer;
      }

      .img {
        width: 36px;
        height: 36px;
        border-radius: 5px;
        cursor: pointer;
      }

      .upload_img {
        display: none;
      }

      .name {
        flex: 1;
        line-height: 36px;
        margin-left: 10px;
        font-size: 16px;
        color: #fff;
      }
    }

    .menuWrap {
      position: absolute;
      z-index: 1;
      top: 50px;
      left: 33%;
      width: 100px;
      font-size: 14px;
      background-color: #fff;
      color: #000;
      border-radius: 4px;
      width: 60%;

      .menu-item {
        padding: 10px;
        // text-align: center;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }

        .iconfont {
          font-size: 18px;
          margin-right: 20px;
          vertical-align: middle;
        }
      }
    }

    .hidden {
      visibility: hidden
    }
  }
</style>
