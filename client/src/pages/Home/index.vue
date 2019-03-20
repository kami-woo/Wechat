<template>
  <div class="wrapper">
    <home-panel></home-panel>
    <home-chat-area></home-chat-area>
  </div>
</template>

<script>
import homePanel from './component/panel.vue'
import homeChatArea from './component/chatArea.vue'
export default {
  name: 'home',
  components: {
    homePanel,
    homeChatArea
  }
}
</script>

<style lang='less' scoped>
  .wrapper {
    width: 1000px;
    height: 100%;
    // border: 1px solid #eee;
    margin: auto;
    display: flex;
    opacity: .97;
  }
</style>
