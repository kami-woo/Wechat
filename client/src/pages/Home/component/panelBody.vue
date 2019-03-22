<template>
  <div class="body" ref="bodyWrap">
    <div class="content">
      <div
        class="chat-item"
        :class="{chat_click: changeBg === index}"
        v-for="(item, index) of roomList"
        @click="handleClickRoom(item, index)"
        :key="index"
      >
        <img :src="item.imgUrl" class="item-img"></img>
        <div class="red-dot" v-show="item.unread != 0">{{item.unread}}</div>
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-time" v-text="newMsg(item.roomName) == undefined ? '' : newMsg(item.roomName).time"></span>
          <div
            class="item-message ellipsis"
            v-text="newMsg(item.roomName) == undefined ? '' : newMsg(item.roomName).type == 'img' ? '[图片]' : newMsg(item.roomName).msg">  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
import Bscroll from 'better-scroll'
export default {
  data() {
    return {
      changeBg: -1
    }
  },
  methods: {
    ...mapMutations(['handleEnterRoom', 'handleRoomList']),
    handleClickRoom(item, index) {
      this.changeBg = index
      this.handleEnterRoom(item)
    }
  },
  computed: {
    ...mapState(['userInfo', 'roomList', 'msgList']),
    ...mapGetters(['newMsg']),
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.bodyWrap, {
      mouseWheel: {
       speed: 3,
       invert: false,
       easeTime: 300
      },
      // scrollbar: {
      //  fade: false,
      //  interactive: true
      // },
      click: true
    })

    // this.handleRoomList()
    // console.log('client_userList')
    // this.$socket.emit('client_userList', this.userInfo.id)
    this.$socket.emit('client_msgList', this.userInfo.id)
    this.$socket.emit('client_userList', this.userInfo.id)
  }
}
</script>

<style lang="less" scoped>
  .body {
    overflow: hidden;
    // position: relative;
    // width: 100%;
    // height: 100%;
    // border: 5px solid blue;
    width: 280px;
    .content {
      .bscroll-indicator {
        border: none !important;
      }

      .chat-item {
        height: 64px;
        border-bottom: 1px solid #24272c;
        display: flex;
        padding: 14px 20px;
        cursor: pointer;
        position: relative;

        .item-img {
          height: 36px;
          width: 36px;
          border-radius: 5px;
        }

        .red-dot {
          position: absolute;
          left: 47px;
          height: 16px;
          width: 18px;
          top: 6px;
          line-height: 16px;
          text-align: center;
          background-color: red;
          border-radius: 9px;
          font-size: 12px;
          color: #fff;
          padding: 2px 4px;
        }

        .item-info {
          flex: 1;
          max-width: 194px;
          margin-left: 10px;
          height: 36px;
          font-size: 13px;

          .item-name {
            color: #fff;
          }

          .item-time {
            float: right;
          }

          .ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
          }

          .item-message {
            color: #989898;
            font-size: 12px;
          }
        }
      }

      .chat_click {
        background: #3a3f45;
      }
    }

    
  }
</style>
