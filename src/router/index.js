import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '@/pages/home'
import memberComponent from '@/pages/member'
import shopcarComponent from '@/pages/shopcar'
import searchComponent from '@/pages/search'
import newslistComponent from '@/pages/newslist'
import newsInfoComponent from '@/pages/newsInfo'
import photoListComponent from '@/pages/photoList'
import photoInfoComponent from '@/pages/photoInfo'
import goodsListComponent from '@/pages/goodsList'
import goodsInfoComponent from '@/pages/goodsInfo'
import goodsDescComponent from '@/pages/goodsDesc'
import goodsCommentComponent from '@/pages/goodsComment'



Vue.use(Router)

export default new Router({
  routes: [
   {path:'/',redirect:'/home'},
   {path:'/home',component:homeComponent},
   {path:'/member',component:memberComponent},
   {path:'/shopcar',component:shopcarComponent},
   {path:'/search',component:searchComponent},
   {path:'/home/newslist',component:newslistComponent},
   {path:'/home/newsInfo/:id',component: newsInfoComponent},
   {path:'/home/photoList',component: photoListComponent},
   {path:'/home/photoInfo/:id',component: photoInfoComponent},
   {path:'/home/goodsList',component: goodsListComponent},
   {path:'/home/goodsInfo/:id',component: goodsInfoComponent},
   { path: '/home/goodsDesc/:id', component: goodsDescComponent },
   { path: '/home/goodsComment/:id', component: goodsCommentComponent },
  ],
  linkActiveClass:'mui-active'
})
