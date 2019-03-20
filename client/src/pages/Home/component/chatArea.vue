<template>
  <div class="chatArea">
    <div class="box-hd">
      <div class="title-wrap">{{ roomInfo.name }}</div>
    </div>
    <div class="box-bd" ref="wrapper"">
      <div class="content" ref="content">
        <div v-for="item of userMsg" class="msgWrap">
          <div v-if="item.sender === userInfo.id" class="bubble-wrap-right">
            <img :src="item.msg" v-if="item.type === 'img'" class="chat-img-right">
            <span class="bubble-right" v-if="item.type !== 'img'">{{ item.msg }}</span>
            <img :src="userInfo.imgUrl" class="msg-img">
          </div>
          <div v-else class="bubble-wrap-left">
            <img :src="roomInfo.chatUrl" class="msg-img">
            <span class="bubble-left" v-if="item.type !== 'img'">{{ item.msg }}</span>
            <img :src="item.msg" v-if="item.type === 'img'" class="chat-img-left">
          </div>
        </div>
      </div>
    </div>
    <box-ft></box-ft>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Bscroll from 'better-scroll'
import boxFt from './boxFt.vue'
export default {
  name: 'chatArea',
  components: {
    boxFt
  },
  computed: {
    ...mapState(['roomInfo', 'userInfo']),
    ...mapGetters(['userMsg'])
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      mouseWheel: {
       speed: 3,
       invert: false,
       easeTime: 300
      },
      scrollbar: {
       fade: false,
       interactive: true
      },
      click: true
    })
  },
  updated() {
    setTimeout(() => {
      this.scroll.scrollTo(0, this.scroll.maxScrollY)
    }, 100)
  }
}
</script>

<style lang='less' scoped>
    .img() {
      height: 40px;
      width: 40px;
      vertical-align: middle;
      border-radius: 2px;
    }

    .bub() {
      padding: 9px 13px;
      border-radius: 4px;
      margin-right: 10px;
      color: #000;
    }

  .chatArea {
    width: 720px;
    display: flex;
    flex-direction: column;
    background-color: #eee;

    .box-hd {
      height: 50px;

      .title-wrap {
        height: 50px;
        text-align: center;
        margin: 0 19px;
        font-size: 14px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
      }
    }

    .box-bd {
      flex: 1;
      min-height: 369px;
      position: relative;
      overflow: hidden;

      .content {
        padding: 10px 0;

        .msgWrap {
          margin: 20px;
          font-size: 14px;

          .bubble-wrap-right {
            text-align: right;

            .msg-img {
              .img
            }

            .bubble-right {
              position: relative;
              background-color: #b2e281;

              &:after {
                position: absolute;
                left: 100%;
                top: 10px;
                content: '';
                border: 6px solid transparent;
                border-left-color: #b2e281;
                border-left-width: 4px;
              }
              .bub
            }

            .chat-img-right {
              height: 130px;
              vertical-align: top;
              margin-right: 10px;
              border-radius: 6px;
              // height: 150px;
              // background-size: cover;
            }
          }

          .bubble-wrap-left {
            .msg-img {
              margin-right: 10px;
              .img
            }

            .bubble-left {
              position: relative;
              background-color: #fff;

              &:after {
                position: absolute;
                right: 100%;
                top: 10px;
                content: '';
                border: 6px solid transparent;
                border-right-color: #fff;
                border-right-width: 4px;
              }
              .bub
            }

            .chat-img-left {
              height: 130px;
              vertical-align: top;
              margin-left: 10px;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }
</style>
