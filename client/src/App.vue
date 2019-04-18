<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="less">
  body, html {
    height: 100%;
    background: url('./assets/bg.jpg');
    background-size: cover;    
    background-position: center;
    overflow: hidden;

  }
  #app {
    height: 100%;
    min-height: 600px;
  }
</style>
