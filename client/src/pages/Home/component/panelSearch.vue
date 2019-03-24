<template>
  <div class="search">
    <i class="iconfont">&#xe603;</i>
    <input class="search-box" @keyup.enter="handleEnter" placeholder="搜索" ref="search_box"/>
    <div class="search-result" :class="{hidden: isActive}" ref="search_result">
      <div class="search-wrap" v-show="search_server.length">
        <div class="title">添加好友</div>
        <div class="item" v-for="item of search_server" @click="handleShowCard(item)">
          <img :src="item.imgUrl" class="result-img">
          <div class="result-name">{{ item.name }}</div>
        </div>
      </div>
      <div class="search-wrap" v-show="search_friend.length">
        <div class="title">好友</div>
        <div class="item" v-for="(item, index) of search_friend" @click="handleClickFriend(item, index)">
          <img :src="item.imgUrl" class="result-img">
          <div class="result-name">{{ item.name }}</div>
        </div>
      </div>
      <div class="notFound" v-if="!search_friend.length && !search_server.length">无匹配结果</div>
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
      search_server: [],
      search_friend: [],
      friend_index: []
    }
  },
  methods: {
    handleEnter(e) {
      this.search_server = []
      let value = e.target.value

      axios.post('/api/queryUser', {
        name: value
      }).then((res) => {
        if(res.data && res.data.success) {
          this.search_server = res.data.userMessage
        }
        this.handleSearchResult(value)
        this.isActive = false
      }).catch((res) => {
        console.log(res)
      })
    },
    handleBodyClick(e) {
      if(e.target !== this.$refs.search_result && e.target !== this.$refs.search_box)
        this.isActive = true
    },
    handleSearchResult(value) {
      this.search_friend = []
      this.friend_index = []

      for (let i=0; i<this.roomList.length; i++) {
        let name = this.roomList[i].name
        if(name.indexOf(value) >= 0) {
          this.search_friend.push(this.roomList[i])
          this.friend_index.push(i)
        }
      }

      for (let i=0; i<this.search_server.length; i++) {
        for (let j=0; j<this.search_friend.length; j++) {
          if(this.search_server[i].id === this.search_friend[j].chatWith) {
            this.search_server.splice(i, 1)
            i -= 1
            break
          }
        }
        if(this.search_server[i].id === this.userInfo.id) {
          this.search_server.splice(i, 1)
          i -= 1
        }
      }
    },
    handleClickFriend(item, index) {
      let data = {
        item,
        index: this.friend_index[index]
      }
      this.handleEnterRoom(data)
    },
    ...mapMutations(['handleShowCard', 'handleEnterRoom'])
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
    // border-bottom: 1px solid #24272c;
    padding: 0 20px 10px 20px;
    position: relative;

    .iconfont {
      left: 25px;
      top: 1px;
      position: absolute;
      font-size: 20px;
      color: #aaa;
    }

    .search-box {
      height: 32px;
      width: 100%;
      outline: none;
      border: none;
      background-color: #26292e;
      padding-left: 30px;
      color: #fff;
    }

    .search-result {
      position: absolute;
      width: 240px;
      background-color: rgb(51,54,59);
      text-align: left;
      cursor: pointer;
      z-index: 1;
      box-shadow: -2px 2px 10px #222;

      .search-wrap {
        margin-top: 10px;
        background-color: #393c43;

        .title {
          padding: 10px 9px;
          color: #787b87;
          font-weight: 400;
          font-size: 14px;
        }

        .item {
          padding: 10px 9px;
          border-bottom: 1px solid #33363b;

          &:hover {
            background-color: #595b64;
          }

          .result-img {
            height: 30px;
            width: 30px;
            margin-right: 10px;
            vertical-align: middle;   ////////?????
            border-radius: 2px;
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
      }

      .notFound {
        padding: 10px 9px 10px 9px;
        color: #787b87;
        font-size: 14px;
      }
    }

    .hidden {
      display: none;
    }
  }
</style>
