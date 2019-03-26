<template>
  <div class="wrapper">
    <home-panel></home-panel>
    <home-chat-area></home-chat-area>
    <add-card></add-card>
    <receive-card></receive-card>
    <info-card></info-card>
  </div>
</template>

<script>
import homePanel from './component/panel.vue'
import homeChatArea from './component/chatArea.vue'
import addCard from '../../common/card.vue'
import receiveCard from '../../common/receive_card.vue'
import infoCard from '../../common/infoCard.vue'

export default {
  name: 'home',
  components: {
    homePanel,
    homeChatArea,
    addCard,
    receiveCard,
    infoCard
  },
}
</script>

<style lang='less' scoped>
  .wrapper {
    position: relative;
    width: 1000px;
    height: 100%;
    margin: auto;
    display: flex;
    opacity: .97;
    // border: 1px solid blue;
  }
</style>
