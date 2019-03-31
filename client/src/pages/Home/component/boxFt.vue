<template>
  <div class="box-ft" v-if="roomInfo.name !== ''">
    <div class="toolBar">
      <emoji-btn @emojiCode="handleChooseEmoji"></emoji-btn>
      <file-btn></file-btn>
      <voice-btn></voice-btn>
    </div>
    <rich-box :emojiCode="emojiCode" @initCode="initCode"></rich-box>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import fileBtn from '../../../common/fileBtn.vue'
import voiceBtn from '../../../common/voiceBtn.vue'
import emojiBtn from '../../../common/emojiBtn.vue'
import richBox from '../../../common/richBox.vue'

export default {
  data() {
    return {
      emojiCode: ''
    }
  },
  components: {
    fileBtn,
    voiceBtn,
    emojiBtn,
    richBox
  },
  methods: {
    handleChooseEmoji(code) {
      this.emojiCode = code
    },
    initCode() {
      this.emojiCode = ''
    }
  },
  computed: mapState(['roomInfo'])
}
</script>

<style lang="less">
  .box-ft {
    height: 180px;
    padding: 0 19px;
    position: relative;

    .toolBar {
      border-top: 1px solid #ccc;
      height: 40px;
      padding: 5px 3px;
    }
  }
</style>
