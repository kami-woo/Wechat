<template>
  <span class="wrapper">
    <div class="emoji-box" v-if="showEmoji">
      <vue-emoji ref="emojiBox" @close="handleCloseEmoji" @select="handleSelectEmoji"></vue-emoji>
    </div>
    <span class="iconfont" @click="handleClickEmoji" ref="emojiBtn" name="emojiBtn">&#xe604;</span>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
import vueEmoji from './emoji.vue'

export default {
  data() {
    return {
      showEmoji: false
    }
  },
  components: {
    vueEmoji
  },
  methods: {
    handleClickEmoji() {
      this.showEmoji = !this.showEmoji
    },
    handleCloseEmoji() {
      this.showEmoji = false
    },
    handleSelectEmoji(code) {
      this.showEmoji = false
      this.$emit('emojiCode', code)
    }
  },
}
</script>

<style lang="less">
  .wrapper {
    .emoji-box {
      display: inline-block;
      position: relative;
    }

    .iconfont {
      font-size: 24px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
</style>
