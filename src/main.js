
import Vue from 'vue'
import App from './App'
import router from './router'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import './css/common.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


new Vue({
  el: '#app',
  router,
  render:h =>h(App)
})
