<template>
  <div class="search">
    <input class="search-box" @keyup.enter="handleEnter" placeholder="搜索" ref="search_box"/>
    <div class="search-result" :class="{hidden: isActive}" ref="search_result">
      <div v-for="item of userSearch" @click="handleShowCard(item)">
        <img :src="item.imgUrl" class="result-img">
        <div class="result-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      isActive: true,
      userSearch: []
    }
  },
  methods: {
    handleEnter(e) {
      axios.post('/api/queryUser', {
        name: e.target.value
      }).then((res) => {
        if(res.data && res.data.success) {
          this.userSearch = res.data.userMessage
        }
        this.isActive = false
      }).catch((res) => {
        console.log(res)
      })
    },
    handleBodyClick(e) {
      if(e.target !== this.$refs.search_result && e.target !== this.$refs.search_box)
        this.isActive = true
    },
    ...mapMutations(['handleShowCard'])
  },
  computed: mapState(['userInfo', 'roomList']),
  mounted() {
    document.addEventListener('click', this.handleBodyClick)
  },
  destroyed() {
    document.removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="less">
  .search {
    text-align: center;
    border-bottom: 1px solid #24272c;
    padding: 0 20px 10px 20px;
    position: relative;

    .search-box {
      height: 32px;
      width: 100%;
      outline: none;
      border: none;
      background-color: #26292e;
      padding-left: 10px;
      color: #fff;
    }

    .search-result {
      position: absolute;
      width: 240px;
      padding: 10px 9px;
      border-bottom: 1px solid #33363b;
      background-color: #393c43;
      text-align: left;
      cursor: pointer;
      z-index: 1;

      .result-img {
        height: 30px;
        width: 30px;
        margin-right: 10px;
        vertical-align: middle;   ////////?????
      }

      .result-name {
        height: 30px;
        line-height: 30px;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        vertical-align: middle;
      }
    }

    .hidden {
      display: none;
    }
  }
</style>
