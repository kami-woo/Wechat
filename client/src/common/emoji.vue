<template>
  <div class="emoji" ref="emoji">
    <ul class="emoji-controller">
      <li 
        v-for="(pannel,index) in pannels" 
        @click="changeActive(index)"
        :class="{'active': index === activeIndex}">{{ pannel }}</li>
    </ul>
    <ul class="emoji-container" ref="wrapper">
      <li 
        v-for="(emojiGroup, index) in emojis" 
        style="padding: 0"
        :key="index"
        v-if="index === activeIndex">
        <a
          href="javascript:;" 
          v-for="(emoji, index) in emojiGroup"  
          :key="index" @click="selectItem(emoji)">
           <span 
              class="emoji-item"
              :title="emoji"
              :class="'sprite-' + getPureName(emoji)"></span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import data from '../utils/emoji/emoji-data.js'
import Bscroll from 'better-scroll'

export default {
  name: 'emoji',
  data () {
    return {
      emojiData: data,
      pannels: ['表情', '自然', '物品', '地点', '符号'],
      activeIndex: 0
    }
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
    },
    getPureName (name) {
      return name.replace(/:/g, '')
    },
    selectItem (emoji) {
      this.$emit('select', emoji)
    },
    handleDocumentClick(e) {
      if(!this.$refs.emoji.contains(e.target) && e.target.getAttribute('name') != 'emojiBtn') {
        this.$emit('close')
      }
    }
  },
  computed: {
    emojis () {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item])
      })
    }
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick, false)
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
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick, false)
  }
}
</script>

<style lang='scss' scoped>
@import '../utils/emoji/emoji-sprite.scss';

.emoji {
  position: absolute;
  width: 380px;
  height: 186px;
  background: #fff;
  z-index: 10;
  padding: 10px;
  padding-top: 0;
  margin-right: 10px;
  top: -215px;
  border-radius: 5px;
  box-shadow: 0 1px 20px 2px rgba(0, 0, 0, 0.2);

  .emoji-controller {
    height: 36px;
    overflow: hidden;
    margin-bottom: 0;

    li {
      float: left;
      width: 76px;
      font-size: 12px;
      line-height: 36px;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active::after{
        content: '';
        width: 100%;
        height: 1px;
        background: #0689dd;
        left: 0;
        bottom: 4px;
        position: absolute;
      }
    }
  }

  .emoji-container {
    height: 140px;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      padding: 5px;
      display: inline-block;
      a {
        float: left;
        overflow: hidden;
        height: 35px;
        transition: all ease-out .2s;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }
  }

  &:after {
    // margin-top: -20px;
    position: absolute;
    bottom: -13px;
    left: 5px;
    content: '';
    border: 7px solid transparent;
    border-top-color: #fff;
    // z-index: 99;
  }
}
</style>
