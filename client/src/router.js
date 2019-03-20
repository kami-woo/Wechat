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
  if(to.name != 'home') {
    if(store.state.isLogin) {
      next({ path: '/home' })
    }
    else {
      if(to.name === 'login') next()
      else next({path: '/login'})
    }
  }
  next()
})

export default router