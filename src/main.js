
import Vue from 'vue'
import App from './App'
import router from './router'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置vue-resource的请求跟路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/';

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import './css/common.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import moment from 'moment'

import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

// Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
//   return moment(dateStr).format(pattern)
// })

Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})

import comment from './components/comment.vue'
Vue.component('comment', comment)

import swiper from './components/swiper.vue'
Vue.component('swiper', swiper)

import Vuex from "vuex"
Vue.use(Vuex)
// let car = JSON.parse(localStorage.getItem('car') || '[]')
const store=new Vuex.Store({
  state:{
    car:[]
  },
  mutations:{
    addToCar(state,goodsInfo){
      let index=state.car.findIndex(item=>item.id===goodsInfo.id)
      if(index===-1){
        //此时表示购物车中还没有该商品，需要把整个商品信息保存
        state.car.push(goodsInfo)
      }else{
        //此时表示购物车中已经存在了该商品，只需要将数量累加
        state.car[index].count += parseInt(goodsInfo.count)
      }
      // localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
