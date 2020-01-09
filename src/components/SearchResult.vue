<template>
<div class="container">
  <div class="row">
  <div class="col-md-8">
    <img src="../assets/img/logo.png">
  </div>
  <div class="card col-md-4 border-0">
    <ul class="nav justify-content-end" style="margin-top: 35px">
      <li class="nav-item">
        <a class="nav-link active" href="/index" style="color: black">首页</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :href="/transaction/+userId" style="color: black">我的订单</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" style="color: black">个人</a>
      </li>
    </ul>
  </div>
</div>
  <hr>
  <div class="row" style="margin-top: 10px">
    <div class="col-md-8">
      <b-card
        :title="$route.query.job"
        tag="article"
        class="mb-2 border-top-0 border-left-0 border-bottom-0"
      >
        <b-card-text>
          <p><v-icon class="clock" name="clock"></v-icon>2019-12</p>
          北京地区{{$route.query.job}}岗位需求总览
          <img :src="require('../assets/img/cloud.png')">
        </b-card-text>
      </b-card>
    </div>


    <div class="col-md-4">
      <b-card
        tag="article"
        class="mb-2 border-0"
      >
        <b-card-text>
          <b-button variant="outline-primary" style="width: 140px;font-size: 16px;text-align: center; line-height:30px;">
            <v-icon class="star" name="star" />     收       藏
          </b-button>
          <br><br>
          数据来源
          <li v-for="img in imgs">
            <br>
            <img :src="img" />
          </li>



        </b-card-text>
      </b-card>

    </div>
  </div>
  <hr>
  <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. 备案号：京ICP备10000000号-1</small></p></div>


</div>
</template>

<script>
  export default {
    name: "SearchResult",
    data(){
      return{
        imgs: [
          require('../assets/img/zhaopin.png'),
          require('../assets/img/51job.png'),
          require('../assets/img/boss.png')
        ],
        userId: 19232
      }
    }
  }
</script>

<style scoped>
  .clock{
    width: 20px;
    color: gray;
  }
  .star{
    width: 25px;
    margin-top: -5px;
  }
  li {
    list-style-type: none;
  }
</style>
