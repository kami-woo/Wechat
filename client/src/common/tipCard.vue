<template>
  <transition
    enter-active-class="animated bounceInDown"
    leave-active-class="animated hinge"
  >
    <div class="card-wrap" ref='card' v-show="showTip">
      <div class="card-hd" name="hd">
        系统提示
        <span class="iconfont" @click="handleShowCard">&#xe69a;</span>
      </div>
      <div class="card-bd">
        {{ tipMsg }}
      </div>
    </div>
  </transition>
  
</template>

<script>
import drag from '../utils/drag.js'

export default {
  name: 'tipCard',
  props: ['showTip', 'tipMsg'],
  methods: {
    handleShowCard() {
      this.$emit('hidden')
    }
  },
  mounted() {
    drag(document, this.$refs.card)
  }
}
</script>

<style lang="less" scoped>
  .card-wrap {
    position: absolute;
    height: 142px;
    width: 300px;
    left: 500px;
    top: 250px;
    border-radius: 5px;
    background-color: rgb(245, 245, 245);
    box-shadow: -2px 2px 10px #ccc;
    overflow: hidden;
    animation-duration: 1s;

    .card-hd {
      height: 42px;
      line-height: 42px;
      background-color: #333;
      color: white;
      font-size: 14px;
      padding-left: 20px;
      padding-right: 20px;

      .iconfont {
        font-size: 14px;
        float: right;
        cursor: pointer;
      }
    }

    .card-bd {
      line-height: 100px;
      text-align: center;
      font-size: 14px;
    }
  }
</style>