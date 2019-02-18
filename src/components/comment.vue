<template>
  <div class="comment-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多吐槽120字）" maxlength="120" v-model="commentContent"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="comment-list">
      <div class="comment-item" v-for="(item, i) in comments" :key="item.add_time">
        <div
          class="comment-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="comment-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>

    <!-- 加载更多 -->
     <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
  data(){
    return{
      pageIndex:1,
      comments:[],
      commentContent:''
    }
  },
  created(){
    this.getComments()
  },
  methods:{
    getComments(){
      this.$http.get("getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result =>{
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
          // concat 方法连接数组, 不会修改原数组, 而是返回一个新数组
          this.comments=this.comments.concat(result.body.message);
      })
    },
    getMore(){
      this.pageIndex++,
      this.getComments()
    },
     postComment(){
    // 1. 想办法把用户输入的内容提交给服务器
    if(this.commentContent.trim().length===0) return Toast("评论内容不能为空！");
    this.$http.post("postcomment/"+this.id,{content:this.commentContent}).then(result=>{
      Toast(result.body.message);
      // 2. 让用户看到最新的数据在1楼
      //将pageIndex重置为1
      this.comments=[]
      this.pageIndex=1
      this.getComments()
      //清空评论输入框
      this.commentContent=''
    })
  },
  },
  props:['id']
};
</script>

<style lang="less" scoped>
.comment-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .comment-list {
    margin: 5px 0;
    .comment-item {
      font-size: 13px;
      .comment-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .comment-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
