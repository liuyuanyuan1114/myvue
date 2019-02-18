<template>
  <div class="goodsInfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :banners="banners"></swiper>
        </div>
      </div>
    </div>

    <!-- <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <h5 class="mui-content-padded">在行内</h5>购买数量:
          <div class="mui-numbox">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input class="mui-input-numbox" type="number">
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量：</span>
            <input
              type="button"
              value="-"
              @click="buyCount >=2 && buyCount--"
              :disabled="buyCount==1"
            >
            <input @change="filterMaxCount" v-model="buyCount" type="number">
            <input
              type="button"
              value="+"
              @click="buyCount < goodsInfo.stock_quantity && buyCount++"
              :disabled="buyCount == goodsInfo.stock_quantity"
            >
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      banners: [],
      goodsInfo: {},
      buyCount: 1,
      ballFlag: false,
      seletedCont: 1 //保存用户选中的商品数量，默认，认为用户买1个
    };
  },
  created() {
    this.getBanners();
    this.getGoodsInfo();
  },
  methods: {
    getBanners() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.banners = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    filterMaxCount() {
      if (this.buyCount > this.getGoodsInfo.stock_quantity) {
        this.buyCount = this.getGoodsInfo.stock_quantity;
      }
    },
    addToShopcar() {
      this.ballFlag = !this.ballFlag;
      this.$store.commit('addToCar',{
        id:this.goodsInfo.id,
        count:this.buyCount,
        price:this.goodsInfo.sell_price,
        selected:true
      })
    },
    //开始执行动画后的钩子函数
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWeidth;
      //小球动画思路
      // 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 如何 获取 徽标（也就是页面中购物车的图标）和小球的 位置？？？   domObject.getBoundingClientRect()
      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      //计算在页面中小球和徽标的横纵坐标差
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    //动画执行完毕后的钩子函数
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    goDesc(id) {
      this.$router.push("/home/goodsDesc/" + id);
    },
    goComment(id) {
      this.$router.push("/home/goodsComment/" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;

  .numbox {
    display: flex;
    height: 50px;
    align-items: center;
    input {
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
      text-align: center;

      &[type="number"] {
        border-left: 0;
        border-right: 0;
        font-size: 12px;
        color: gray;
      }
    }
  }

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>


