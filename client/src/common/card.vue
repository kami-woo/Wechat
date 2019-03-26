<template>
  <div class="card-wrap" ref='card' v-show="cardInfo.isShow">
    <div class="card-hd" name="hd">
      系统消息
      <span class="iconfont" @click="handleHiddenCard">&#xe69a;</span>
    </div>
    <div class="card-bd">
      <div class="info">
        <img class="img" :src="cardInfo.imgUrl">
        <span class="name">{{ cardInfo.name }}</span>
        <span>账号：{{ cardInfo.account }}</span>
      </div>
      <div class="addition">
        <span class="text">附加消息：</span>
        <Input class="textarea" v-model="msg" :rows="4" type="textarea" placeholder="Enter something..." />
        <Button class="btn" type="primary" @click="handleAddFriend">加为好友</Button>
      </div>
    </div>
  </div>
</template>

<script>
import drag from '../utils/drag.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'card',
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    ...mapMutations(['handleHiddenCard']),
    handleAddFriend() {
      this.handleHiddenCard()

      let data = {
        addition: this.msg,
        imgUrl: this.userInfo.imgUrl,
        name: this.userInfo.name,
        sendId: this.userInfo.id,
        receiveId: this.cardInfo.id,
        account: this.userInfo.account
      }
      this.$socket.emit('client_addFriend', data)

      this.msg = ''
    }
  },
  computed: mapState(['cardInfo', 'userInfo']),
  mounted() {
    drag(document, this.$refs.card)
  }
}
</script>

<style lang="less" scoped>
  .card-wrap {
    position: absolute;
    height: 280px;
    width: 500px;
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
      display: flex;

      .info {
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
          height: 120px;
          width: 120px;
          border-radius: 10px;
          margin-top: 30px;
        }

        .name {
          margin-top: 8px;
          font-size: 20px;
        }
      }

      .addition {
        padding: 30px;
        .textarea {
          margin-top: 10px;
        }

        .btn {
          margin-top: 20px;
        }
      }
    }
  }
</style>