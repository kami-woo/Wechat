<template>
  <div class="box-bd" ref="wrapper"">
    <div class="content" ref="content">
      <div v-for="item of userMsg" class="msgWrap">
        <div v-if="item.sender === userInfo.id" class="bubble-wrap-right">
          <img :src="item.msg" v-if="item.type === 'img'" class="chat-img-right">
          <span class="bubble-right" v-else-if="item.type === 'text'">{{ item.msg }}</span>
          <span class="bubble-right" v-else-if="item.type === 'mp3'" @click="handleClickVoice">
            <audio :src="item.msg"></audio>
            <i class="iconfont i-right">&#xe62b;</i>
            <span class="duration">{{ item.duration }}</span>
          </span>
          <span class="file-right" v-else-if="item.type === 'file'" @click="handleClickFile(item.msg)">
            <div class="file-flex">
              <span class="file-info">
                <div class="file-name">{{item.name}}</div>
                <div class="file-size">{{item.size}}</div>
              </span>
              <div class="file-img">
                <img src="/mock/fileBg.png">
              </div>
            </div>
          </span>
          <img :src="userInfo.imgUrl" class="msg-img">
        </div>
        <div v-else class="bubble-wrap-left">
          <img :src="roomInfo.chatUrl" class="msg-img">
          <span class="bubble-left" v-if="item.type === 'text'">{{ item.msg }}</span>
          <span class="bubble-left" v-else-if="item.type === 'mp3'" @click="handleClickVoice">
            <audio :src="item.msg"></audio>
            <span>{{ item.duration }}</span>
            <i class="iconfont">&#xe62c;</i>
          </span>
          <img :src="item.msg" v-else-if="item.type === 'img'" class="chat-img-left">
          <span class="file-left" v-else-if="item.type === 'file'" @click="handleClickFile(item.msg)">
            <div class="file-flex">
              <div class="file-img">
                <img src="/mock/fileBg.png">
              </div>
              <span class="file-info">
                <div class="file-name">{{item.name}}</div>
                <div class="file-size">{{item.size}}</div>
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Bscroll from 'better-scroll'

export default {
  computed: {
    ...mapState(['roomInfo', 'userInfo']),
    ...mapGetters(['userMsg'])
  },
  methods: {
    handleClickVoice(e) {
      
      let audio = e.currentTarget.firstElementChild
      // console.log(audio)
      audio.play()
    },
    handleClickFile(url) {
      // console.log(msg)
      window.open(url)
    }
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

<style lang="less">
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

  .aft() {
    position: absolute;
    top: 10px;
    content: '';
    border: 6px solid transparent;
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

            .iconfont {
              font-size: 14px;
              vertical-align: middle;
              margin-left: 10px;
            }

            &:after {
              .aft;
              left: 100%;
              border-left-color: #b2e281;
              border-left-width: 4px;
            }
            .bub
          }

          .file-right {

            .file-img {
              margin-left: 20px;
            }

            .file;

            &:after {
              .aft;
              left: 100%;
              border-left-color: #fff;
              border-left-width: 4px;
            }
          }

          .chat-img-right {
            height: 130px;
            vertical-align: top;
            margin-right: 10px;
            border-radius: 3px;
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

            .iconfont {
              font-size: 14px;
              vertical-align: middle;
              margin-left: 10px;
            }

            &:after {
              .aft;
              right: 100%;
              border-right-color: #fff;
              border-right-width: 4px;
            }
            .bub
          }

          .file-left {

            .file-name {
              // text-align: right;
            }

            .file-img {
              margin-right: 20px;
            }

            .file;

            &:after {
              .aft;
              right: 100%;
              border-right-color: #fff;
              border-right-width: 4px;
            }
          }

          .chat-img-left {
            height: 130px;
            vertical-align: top;
            // margin-left: 10px;
            border-radius: 3px;
          }
        }
      }
    }
  }

  .file() {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    padding: 10px;
    background-color: #fff;
    vertical-align: top;
    border-radius: 3px;
    cursor: pointer;

    .file-flex {
      display: flex;

      .file-img {
        // background: url('/mock/fileBg.png');
        // background-size: cover;
        height: 76px;
        width: 76px;
        background-color: #ddd;
        border-radius: 5px;
        padding: 5px;
        // padding: 5px;

        img {
          height: 66px;
          width: 66px;
        }
      }

      .file-info {
        // vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 180px;

        .file-name {
          // max-width: 200px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          // border: 1px solid black;
        }

        .file-size {
          // margin-top: 10px;
          color: #aaa;
        }
      }
    }

    // &:after {
    //   .aft;
    //   border-left-color: #fff;
    // }
  }
</style>
