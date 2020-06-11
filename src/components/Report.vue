<template>
  <div class="container" v-if="isShow">
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
            <a class="nav-link" href="/mark" style="color: black">我的收藏</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout" style="color: black">登出</a>
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
            {{region}}地区{{job}}岗位需求总览
            <!--<img :src="require('../assets/img/cloud.png')">-->

            <div id="wordcloud" style="width: 700px;height: 500px;"></div>
            <div id="graph" style="width: 700px;height: 500px;"></div>

          </b-card-text>
        </b-card>
      </div>


      <div class="col-md-4">
        <b-card
          tag="article"
          class="mb-2 border-0"
        >
          <b-card-text>
            数据来源
            <li v-for="img in imgs">
              <br>
              <img :src="img" />
            </li>
            <br><br>
            共检索到{{count}}条招聘信息记录。
            <br>
            该地区、时间范围内的招聘信息总条数为{{count_all}}条。
            <br><br>
            {{job}}岗位技能关键字：<br><span v-for="it in word_list">{{it.name}} </span>


          </b-card-text>
        </b-card>

      </div>
    </div>
    <hr>
    <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. </small></p></div>

  </div>
</template>

<script>
  import echarts from "echarts";
  import "echarts-wordcloud/dist/echarts-wordcloud";
  import "echarts-wordcloud/dist/echarts-wordcloud.min";
  import axios from "axios";
  export default {
    name: "Report",
    data(){
      return{
        imgs: [
          require('../assets/img/51job.png'),
        ],
        isShow:false,
        word_cloud_view: null,
        word_cloud_options: {},
        word_list: [],
        job: '',
        region: '',
        time_range: '',
        count: 0,
        count_all: 0,
        fliterNode:[],
        link: [],
      }
    },
    methods: {
      logout(){
        sessionStorage.clear();
        this.$router.push('/login')
      },
      draw_word_cloud_view() {
        if (this.word_cloud_view) {
          this.word_cloud_view.dispose();
        }
        this.word_cloud_view = document.getElementById('wordcloud') && echarts.init(document.getElementById('wordcloud'), 'macarons');
        this.word_cloud_view && this.word_cloud_view.setOption(this.word_cloud_options);
      },
      word_cloud_init_view_data() {
        let word_cloud_series = [{
          type: 'wordCloud',
          //shape: 'circle',
          //maskImage: maskImage,
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,
          sizeRange: [20, 100],
          rotationRange: [0, 0],
          autoSize: {
            enable: true,
            minSize: 6
          },
          textPadding: 0,
          // rotationStep: 45,
          // gridSize: 8,
          drawOutOfBound: false,
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              //fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: function () {
                // Random color
                return 'rgb(' + [
                  Math.round(Math.random() * 256),
                  Math.round(Math.random() * 256),
                  Math.round(Math.random() * 256)
                ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 3,
              shadowColor: '#333'
            }
          },
          data: this.word_list
        }]

        this.word_cloud_options = {
          series: word_cloud_series
        }
        this.word_cloud_view.setOption(this.word_cloud_options)
      },
      draw_graph(){
        const ca = [{ name: '岗位' }, { name: '技能' }];
        const KnowledgeOP = echarts.init(document.getElementById('graph'));
        const option = {
          tooltip: {},
          legend: [{
            data: ca.map(a => a.name),
          }],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'force',
              nodes: this.fliterNode,
              links: this.link,
              categories: ca,
              label: {
                normal: {
                  show:'false',
                  position: 'right'
                }
              },
              slient:false,//是否响应点击事件，为false的时候就是响应
              force: {
                repulsion: 800
              },
              roam: true,
              focusNodeAdjacency: true,
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                lineStyle: {
                  width: 2
                }
              }
            },
          ],
        };
        KnowledgeOP.setOption(option);
      },
      get_data(){
        let keyword = this.$route.params.keyword
        this.job = keyword.split('-')[1]
        this.region = keyword.split('-')[0]
        const payload = {
          'job': this.job,
          'region': this.region,
          'range':['2020/5/1','2020/5/1']
        };
        const path = 'http://localhost:5000/search';
        axios.post(path, payload)
          .then((res) => {
            this.word_list = res.data.word_cloud
            this.time_range = res.data.range
            this.count = res.data.count
            this.count_all = res.data.count_all
            this.fliterNode = res.data.fliterNode
            this.link = res.data.link
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    created() {

      sessionStorage.removeItem('id')
      this.get_data()
      this.isShow = true
    },
    mounted() {
      setTimeout(() =>{
        this.draw_word_cloud_view()
        this.word_cloud_init_view_data()
        this.draw_graph()
        this.isShow = true;
      },4500);
    },

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

