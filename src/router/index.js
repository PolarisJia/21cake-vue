import Vue from 'vue'
import Router from 'vue-router'

// 404
const Notfound = () => import('components/notfound/notfound')
// 首页
const Index = () => import('components/index/index')

Vue.use(Router)

Router.prototype.$authTime = false

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '*',
    name: '404',
    meta: {title: '404 - 找不到页面'},
    component: Notfound
  }, {
    path: '/',
    name: '/',
    meta: {auth: false},
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    meta: {title: '21cake'},
    component: Index
  }]
})

router.beforeEach(({meta, path}, from, next) => {
  if (meta.title) {
    document.title = meta.title
  }
  next()
})

export default router
