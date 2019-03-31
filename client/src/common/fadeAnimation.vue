<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "fade"
}
</script>

<style lang="less" scoped>
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transition: opacity .5s ease;
  }

  .fade-enter-active, .fade-leave-active {
    opacity: 1;
  }
</style>
