<template>
  <div class="panel">
    <panel-header></panel-header>
    <panel-search></panel-search>
    <panel-body></panel-body>
  </div>
</template>

<script>
import axios from 'axios'
import panelBody from './panelBody.vue'
import panelSearch from './panelSearch.vue'
import panelHeader from './panelHeader.vue'

export default {
  name: "panel",
  components: {
    panelBody,
    panelSearch,
    panelHeader
  }
}
</script>

<style lang="less" scoped>
  .panel {
    width: 280px;
    background-color: #2e3238;
  }
</style>