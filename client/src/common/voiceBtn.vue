<template>
  <span>
    <span class="iconfont voice" @mousedown="handleMousedown">&#xe6ae;</span>
    <!-- <audio ref="voice"></audio> -->
    <!-- <span @click="handlePlay">播放</span> -->
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
import recorder from '../util/recorder.mp3.min.js'

export default {
  data() {
    return {
      rec: ''
    }
  },
  methods: {
    handleMousedown() {
      // rec.open(function(){       //打开麦克风授权获得相关资源

      this.rec.start();//开始录音

      document.onmouseup = () => {
        this.rec.stop((blob,duration) => {//到达指定条件停止录音，拿到blob对象想干嘛就干嘛：立即播放、上传
          console.log(URL.createObjectURL(blob),"时长:"+duration+"ms");
          // console.log(blob)
          // end(blob)
          // this.$refs.voice.src = URL.createObjectURL(blob)
          // rec.close();//释放录音资源
          if(duration > 1000) {
            let data = {
              file: blob,
              _this: this,
              duration: Math.floor(duration/1000)
            }
            
            this.client_sendComplex(data)
            document.onmouseup = null
          }
        }, (msg) => {
          console.log("录音失败:"+msg);
          document.onmouseup = null
        })
      }
    },
    // handlePlay() {
    //   // this.$refs.voice.play()
    // },
    ...mapMutations(['client_sendComplex'])
  },
  mounted() {
    this.rec = Recorder()
    this.rec.open(() => {}, (msg) => { console.log("无法录音:"+msg ) })
  }
}
</script>

<style lang="less">
  .voice {
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;

    &:active {
      color: #ccc;
    }
  }
</style>
