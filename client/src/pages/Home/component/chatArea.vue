<template>
  <div class="chatArea">
    <div class="box-hd">
      <div class="title-wrap">{{ roomInfo.name }}</div>
    </div>
    <box-bd></box-bd>
    <box-ft></box-ft>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import boxFt from './boxFt.vue'
import boxBd from './boxBd.vue'

export default {
  name: 'chatArea',
  components: {
    boxFt,
    boxBd
  },
  computed: {
    ...mapState(['roomInfo'])
  },
}
</script>

<style lang='less' scoped>

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
  }
</style>
