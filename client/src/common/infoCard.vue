<template>
  <div class="card-wrap" ref='card' v-show="showInfoCard">
    <div class="card-hd" name="hd">
      个人资料
      <span class="iconfont" @click="handleShowInfoCard(false)">&#xe69a;</span>
    </div>
    <div class="card-bd">
        <img class="img" ref="img" :src="userInfo.imgUrl" @click="handleImgClick">
        <input type="file" class="upload_img" ref="upload_img" accept="image/jpeg,image/jpg,image/png,image/svg" @change="handleChangeImg"/>
        <div class="info">
          <div class="name">{{userInfo.name}}</div>
          <div class="account">账号：{{userInfo.account}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drag from '../utils/drag.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'infoCard',
  data() {
    return {
      showCard: true
    }
  },
  methods: {
    handleImgClick() {
      this.$refs.upload_img.click()
    },
    handleHiddenCard() {
      this.showCard = false
    },
    handleChangeImg(e) {
      let reader
      if(window.FileReader) {
        reader = new FileReader();
      } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
      }
      let file = e.target.files[0];
      // let imageType = /^image\//;         // 是否是图片
      // if(!imageType.test(file.type)) {
      //   alert("请选择图片！");
      //   return;
      // }
      
      this.imgMessage(file)

      reader.onload = (e) => {
        let img = this.$refs.img
        img.src = e.target.result
        
      };
      reader.readAsDataURL(file);
    },
    ...mapMutations(['imgMessage', 'handleShowInfoCard'])
  },
  computed: mapState(['userInfo', 'showInfoCard']),
  mounted() {
    drag(document, this.$refs.card)
  }
}
</script>

<style lang="less" scoped>
  .card-wrap {
    position: absolute;
    height: 180px;
    width: 300px;
    left: 300px;
    top: 250px;
    border-radius: 5px;
    background-color: rgb(245, 245, 245);
    box-shadow: -2px 2px 10px #ccc;
    overflow: hidden;

    .card-hd {
      height: 42px;
      line-height: 42px;
      background-color: #333;
      color: white;
      font-size: 14px;
      padding-left: 20px;
      padding-right: 10px;

      .iconfont {
        font-size: 14px;
        float: right;
        cursor: pointer;
      }
    }

    .card-bd {
      padding: 19px 19px;
      display: flex;
      .img {
        height: 100px;
        width: 100px;
        border-radius: 50px;
        cursor: pointer;
      }

      .upload_img {
        display: none;
      }

      .info {
        // border: 1px solid blue;
        // flex: 1;
        margin-left: 30px;

        .name {
          font-size: 30px;
          font-weight: 400;
          padding-top: 10px;
        }

        // .account {
        //   margin-left: 10px;
        // }
      }
    }
  }
</style>