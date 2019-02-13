<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <!-- <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
        <a :href="item.url">
          <img :src="item.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in banners" :key="index">
        <a :href="item.url">
          <img :src="item.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-home"></span> -->
          <img src="@/assets/menu1.png" alt="">
          <div class="mui-media-body">Home</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="@/assets/menu2.png" alt="">
          <div class="mui-media-body">Email</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
           <img src="@/assets/menu3.png" alt="">
          <div class="mui-media-body">Chat</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
           <img src="@/assets/menu4.png" alt="">
          <div class="mui-media-body">location</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="@/assets/menu5.png" alt="">
          <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="@/assets/menu6.png" alt="">
          <div class="mui-media-body">Phone</div>
        </a>
      </li>   
    </ul>
  </div>
</template>

<style lang='less'>
.home-container {
  // .mt-swipe {
  //   height: 200px;
  //   .mt-swipe-item {
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

.mui-table-view {
    background-color: #fff;
    img {
      width: 80%;
    }
    .mui-table-view-cell {
      border: none;
    }
    .mui-media-body {
      font-size: 13px !important;
    }
  }

}
</style>


<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$http.get("http://www.lovegf.cn:8899/api/getlunbo").then(result => {
        this.banners = result.body.message;
      });
    }
  }
};
</script>
