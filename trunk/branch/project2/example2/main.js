import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引用API文件
import api from './api/index'
import utils from './utils/index'
import FastClick from 'fastclick'
// import VueTouch from 'vue-touch'

// Vue.use(VueTouch, {name: 'v-touch'})
// VueTouch.config.swipe = {
//   threshold: 180 //手指左右滑动距离
// }

FastClick.attach(document.body);
// 将工具方法绑定到全局
Vue.prototype.$utils = utils
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0)  
//   next()
// })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
