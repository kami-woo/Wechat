import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import './assets/styles/iconfont.css';
// import socket from './socket'
import VueSocketIO from 'vue-socket.io'
import router from './router.js'
import store from './store/index.js'
import { emoji } from './utils/emoji/emoji.js'
const url = 'localhost:3000'

Vue.prototype.emoji = emoji

Vue.use(new VueSocketIO({
  debug: true,
  connection: url,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  render: h => h(App),
  router,
  store,
  sockets: {
    connect() {
      console.log('socket connectd')
    },
    getClient_id() {
      this.$socket.emit('client_id', store.state.userInfo.id)
      console.log('socket 重新连接')
    }
  }
}).$mount('#app')
