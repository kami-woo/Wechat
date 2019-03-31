// import Home from './views/home.vue'
import Router from 'vue-router'
import Vue from 'vue'
// import Login from './views/login.vue'
import Home from './pages/Home/index.vue'
import Login from './pages/Login/index.vue'
import store from './store'

Vue.use(Router)

let router = new Router({
  routes: [
    { 
      name: 'home',
      path: '/home',
      component: Home
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.name != 'home') {               // 判断是否跳转到home
    if(store.state.isLogin) {           // 判断登陆状态
      next({ path: '/home' })           // 是则跳转
    }
    else {
      if(to.name === 'login') next()    // 否则跳转到login
      else next({path: '/login'})
    }
  }
  next()
})

export default router