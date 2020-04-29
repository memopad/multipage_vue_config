import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      name: 'index',
      meta:{
        title:'首页',
        index: 0,
        keepAlive:true,
      },
      component: Index
    }
  ],
})