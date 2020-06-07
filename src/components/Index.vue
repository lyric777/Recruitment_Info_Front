<template>

<div class="container">
  <div class="row">
    <div class="col-md-8">
      <!--<h4 style="margin-top: 6px">产品经理招聘信息分析系统</h4>-->
    </div>
    <div class="card col-md-4 border-0">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link active" href="/index" style="color: black">首页</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mark" style="color: black">我的收藏</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout" style="color: black">登出</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="row" style="margin-top: 20px;">
    <div class="col-md-3" style="margin-top: -30px;margin-left: -40px;margin-right: 40px">
      <img src="../assets/img/logo.png">
    </div>
    <div class="col-md-9 border-0" style="margin-top: 5px">
      <b-form inline>
        <b-form-group
          id="input-group-1"
          label="职位："
          label-for="jobname"
        >
          <b-form-input list="my-list-id" id="jobname" v-model="form.jobname" style="width: 150px"/>
          <datalist id="my-list-id">
            <option v-for="job in jobs">{{ job }}</option>
          </datalist>
        </b-form-group>
        <b-form-group
          style="margin-left: 15px"
          id="input-group-2"
          label="地区："
          label-for="region">
          <b-form-select
            style="width: 80px"
            id="region"
            v-model="form.region"
            :options="regions"
            required
          />
        </b-form-group>
        <b-form-group
          style="margin-left: 15px"
          id="input-group-3"
          label="时间："
          label-for="range">
          <vue-datepicker-local v-model="form.range" format="YYYY-MM" style="width:200px" :disabledDate="disabledDate" />

        </b-form-group>
        <b-button @click="search" variant="primary" style="width: 80px;margin-left: 10px">查询</b-button>
      </b-form>
    </div>
  </div>
  <div class="row" style="margin-top: 10px">
    <div class="col-md-3">
      <b-card-group deck>
        <b-card no-body header="热门地区当月报告">
          <b-list-group flush>
            <b-list-group-item href="#">全国-产品经理</b-list-group-item>
            <b-list-group-item href="#">全国-金融产品经理</b-list-group-item>
            <b-list-group-item href="#">全国-产品经理助理</b-list-group-item>
            <b-list-group-item href="#">全国-高级产品经理</b-list-group-item>
            <b-list-group-item href="#">全国-电商产品经理</b-list-group-item>
            <b-list-group-item href="#">北京-产品经理</b-list-group-item>
            <b-list-group-item href="#">上海-产品经理</b-list-group-item>
            <b-list-group-item href="#">深圳-产品经理</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </div>
    <div class="card col-md-9 border-0">
      <div>
        <b-carousel
          id="carousel"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          img-width="622px"
          img-height="322px"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Slides with image only -->
          <b-carousel-slide :img-src="imgSrc1"></b-carousel-slide>
          <b-carousel-slide :img-src="imgSrc2"/>
        </b-carousel>

      </div>
    </div>
  </div>
  <hr>
  <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. </small></p></div>

</div>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local'
  import VDistpicker from 'v-distpicker'
  export default {
    name: "Index",
    components: {
      VueDatepickerLocal,
      VDistpicker
    },
    data() {
      return {
        slide: 0,
        sliding: null,
        imgSrc1: require('../assets/img/carousel_beijing2.jpg'),
        imgSrc2: require('../assets/img/carousel_shanghai.jpg'),
        jobs: ['产品经理', '数据产品经理', '高级产品经理', '产品经理助理','金融产品经理','电商产品经理', '售前产品经理', '策略产品经理', '软件产品经理', '法律产品经理', '需求分析师'],
        form:{
          jobname: '',
          region: '全国',
          range: [new Date(),new Date()],
        },
        regions: [{ text: '全国', value: '全国' },'北京', '上海', '成都', '武汉', '深圳','重庆','天津','南京','广州','苏州','合肥','无锡','杭州'],
        userId: 19232
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      search(){
        this.$router.push({
          path: '/search',
          query:{
            job: this.form.jobname,
            region: this.form.region,
            range: [this.form.range[0].toLocaleDateString(),this.form.range[1].toLocaleDateString()]
          }
        })
      },
      disabledDate(time){
        //console.log(time)
        if(time.getTime() < new Date(2019,12,1).getTime()) return true;
      },
      logout(){
        sessionStorage.clear();
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
