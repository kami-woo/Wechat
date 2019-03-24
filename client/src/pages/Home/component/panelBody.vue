<template>
  <div class="body">
    <div class="option">
      <div class="opt-item">
        <div
          class="iconfont"
          :class="{white: chat_mode === 'private'}"
          name="private"
          @click="handleClickMode">&#xe65a;
        </div>
      </div>
      <div class="opt-item">
        <div
          class="iconfont"
          :class="{white: chat_mode === 'group'}"
          name="group"
          @click="handleClickMode">&#xe63c;
        </div>
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
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
              v-text="newMsg(item.roomName) == undefined ?
                '' : newMsg(item.roomName).type == 'img' ?
                 '[图片]' : newMsg(item.roomName).type == 'mp3' ?
                 '[语音]' : newMsg(item.roomName).msg">  
            </div>
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
      chat_mode: 'private'
    }
  },
  methods: {
    ...mapMutations(['handleEnterRoom', 'handleRoomList']),
    handleClickRoom(item, index) {
      // this.changeBg = index
      let data = {
        index,
        item
      }
      this.handleEnterRoom(data)
    },
    handleClickMode(e) {
      console.log(e.currentTarget)
      this.chat_mode = e.currentTarget.getAttribute('name')
    }
  },
  computed: {
    ...mapState(['userInfo', 'roomList', 'msgList', 'changeBg']),
    ...mapGetters(['newMsg']),
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
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

    this.$socket.emit('client_msgList', this.userInfo.id)
    this.$socket.emit('client_userList', this.userInfo.id)
  }
}
</script>

<style lang="less" scoped>
  .body {

    .option {
      text-align: center;
      border-bottom: 1px solid #24272c;

      .opt-item {
        display: inline-block;
        width: 50%;
        position: relative;
        color: #aaa;

        .iconfont {
          font-size: 30px;
          cursor: pointer;
          // border-right: 1px solid #24272c;
        }

        .white {
          color: #fff;
        }

        &:after {
          position: absolute;
          content: "";
          right: 0;
          top: 12px;
          width: 0;
          height: 20px;
          border-right: 1px solid #24272c;
        }
      }

      
    }

    .wrapper {
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
  }
  
</style>
