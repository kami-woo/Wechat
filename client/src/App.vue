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

<style>
  body, html {
    height: 100%;
    /*background: url('./assets/bg.jpg');*/
    background-size: cover;
  }
  #app {
    height: 100%;
    min-height: 600px;
  }
</style>
