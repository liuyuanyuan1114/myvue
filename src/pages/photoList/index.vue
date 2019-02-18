<template>
  <div class="photoList-container">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item' , {'mui-active' :item==0}]"
           v-for="item in categories"
           :key="item.id"
           @click="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>


  </div>
</template>

<script>
import mui from "@/lib/mui/js/mui.js"
export default {
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created(){
     this.getCategories(),
    this. getPhotoList(0)
  },
  data(){
    return{
      categories:[],
      photoList:[]
    }
  },
  methods:{
    getCategories(){
      this.$http.get("getimgcategory").then(result =>{
        this.categories=result.body.message;
        this.categories.unshift({
           id:0,
          title:"全部"          
        })
      })
    },
    getPhotoList(cateid){
      this.$http.get("getimages/"+cateid).then(result =>{
        this.photoList=result.body.message
      })
    }
  }
};
</script>

<style lang="less">
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
