<template>
<div>
<loading v-if="isLoading"> </loading>
<div class="container" v-show="isShow">
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
          <p><v-icon class="clock" name="clock"></v-icon>2020-5</p>
          {{$route.query.region}}地区{{$route.query.job}}岗位需求总览
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
          <b-button variant="outline-primary" style="width: 140px;font-size: 16px;text-align: center; line-height:30px;">
            <v-icon class="star" name="star" />     收       藏
          </b-button>
          <br><br>
          数据来源
          <li v-for="img in imgs">
            <br>
            <img :src="img" />
          </li>
          <br><br>
          共检索到370条招聘信息记录。
          <br>
          该地区、时间范围内的招聘信息总条数为3137条。
          <br><br>
          {{$route.query.job}}岗位技能关键字：<br><span v-for="it in word_list">{{it.name}} </span>


        </b-card-text>
      </b-card>

    </div>
  </div>
  <hr>
  <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. 备案号：京ICP备10000000号-1</small></p></div>

</div>
</div>
</template>

<script>
  import echarts from "echarts";
  import "echarts-wordcloud/dist/echarts-wordcloud";
  import "echarts-wordcloud/dist/echarts-wordcloud.min";
  import Loading from "./Loading";
  import axios from "axios";
  export default {
    name: "SearchResult",
    components: {Loading},
    data(){
      return{
        imgs: [
          require('../assets/img/51job.png'),
        ],
        isLoading:true,
        isShow:false,
        word_cloud_view: null,
        word_cloud_options: {},
        word_list:[]
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
          sizeRange: [20, 120],
          rotationRange: [0, 0],
          autoSize: {
            enable: true,
            minSize: 6
          },
          textPadding: 0,
          // rotationStep: 45,
          // gridSize: 8,
          drawOutOfBound:false,
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
        const fliterNode = [
          { id: '0', name: 'Myriel', itemStyle: null, symbolSize: 19.12381, x: -266.82776, y: 299.6904, attributes: { modularity_class: 0 }, value: 28.685715, label: { normal: { show: false } }, category: 0 },
          { id: '1', name: 'Napoleon', itemStyle: null, symbolSize: 2.6666666666666665, x: -418.08344, y: 446.8853, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '2', name: 'MlleBaptistine', itemStyle: null, symbolSize: 6.323809333333333, x: -212.76357, y: 245.29176, attributes: { modularity_class: 1 }, value: 9.485714, label: { normal: { show: false } }, category: 1 },
          { id: '3', name: 'MmeMagloire', itemStyle: null, symbolSize: 6.323809333333333, x: -242.82404, y: 235.26283, attributes: { modularity_class: 1 }, value: 9.485714, label: { normal: { show: false } }, category: 1 },
          { id: '4', name: 'CountessDeLo', itemStyle: null, symbolSize: 2.6666666666666665, x: -379.30386, y: 429.06424, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '5', name: 'Geborand', itemStyle: null, symbolSize: 2.6666666666666665, x: -417.26337, y: 406.03506, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '6', name: 'Champtercier', itemStyle: null, symbolSize: 2.6666666666666665, x: -332.6012, y: 485.16974, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '7', name: 'Cravatte', itemStyle: null, symbolSize: 2.6666666666666665, x: -382.69568, y: 475.09113, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '8', name: 'Count', itemStyle: null, symbolSize: 2.6666666666666665, x: -320.384, y: 387.17325, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '9', name: 'OldMan', itemStyle: null, symbolSize: 2.6666666666666665, x: -344.39832, y: 451.16772, attributes: { modularity_class: 0 }, value: 4, label: { normal: { show: false } }, category: 0 },
          { id: '10', name: 'Labarre', itemStyle: null, symbolSize: 2.6666666666666665, x: -89.34107, y: 234.56128, attributes: { modularity_class: 1 }, value: 4, label: { normal: { show: false } }, category: 1 },
          { id: '11', name: 'Valjean', itemStyle: null, symbolSize: 66.66666666666667, x: -87.93029, y: -6.8120565, attributes: { modularity_class: 1 }, value: 100, label: { normal: { show: true } }, category: 1 },
          { id: '12', name: 'Marguerite', itemStyle: null, symbolSize: 4.495239333333333, x: -339.77908, y: -184.69139, attributes: { modularity_class: 1 }, value: 6.742859, label: { normal: { show: false } }, category: 1 },
          { id: '13', name: 'MmeDeR', itemStyle: null, symbolSize: 2.6666666666666665, x: -194.31313, y: 178.55301, attributes: { modularity_class: 1 }, value: 4, label: { normal: { show: false } }, category: 1 },
          { id: '14', name: 'Isabeau', itemStyle: null, symbolSize: 2.6666666666666665, x: -158.05168, y: 201.99768, attributes: { modularity_class: 1 }, value: 4, label: { normal: { show: false } }, category: 1 },
          { id: '15', name: 'Gervais', itemStyle: null, symbolSize: 2.6666666666666665, x: -127.701546, y: 242.55057, attributes: { modularity_class: 1 }, value: 4, label: { normal: { show: false } }, category: 1 },
          { id: '16', name: 'Tholomyes', itemStyle: null, symbolSize: 17.295237333333333, x: -385.2226, y: -393.5572, attributes: { modularity_class: 2 }, value: 25.942856, label: { normal: { show: false } }, category: 2 },
          { id: '17', name: 'Listolier', itemStyle: null, symbolSize: 13.638097333333334, x: -516.55884, y: -393.98975, attributes: { modularity_class: 2 }, value: 20.457146, label: { normal: { show: false } }, category: 2 },
          { id: '18', name: 'Fameuil', itemStyle: null, symbolSize: 13.638097333333334, x: -464.79382, y: -493.57944, attributes: { modularity_class: 2 }, value: 20.457146, label: { normal: { show: false } }, category: 2 },
          { id: '19', name: 'Blacheville', itemStyle: null, symbolSize: 13.638097333333334, x: -515.1624, y: -456.9891, attributes: { modularity_class: 2 }, value: 20.457146, label: { normal: { show: false } }, category: 2 },
          { id: '20', name: 'Favourite', itemStyle: null, symbolSize: 13.638097333333334, x: -408.12122, y: -464.5048, attributes: { modularity_class: 2 }, value: 20.457146, label: { normal: { show: false } }, category: 2 },
          { id: '21', name: 'Dahlia', itemStyle: null, symbolSize: 13.638097333333334, x: -456.44113, y: -425.13303, attributes: { modularity_class: 2 }, value: 20.457146, label: { normal: { show: false } }, category: 2 },
          { id: '22', name: 'Zephine', itemStyle: null, symbolSize: 13.638097333333334, x: -459.1107, y: -362.5133, attributes: { modularity_class: 2 }, value: 20.457146, label: { normal: { show: false } }, category: 2 },
          { id: '23', name: 'Fantine', itemStyle: null, symbolSize: 28.266666666666666, x: -313.42786, y: -289.44803, attributes: { modularity_class: 2 }, value: 42.4, label: { normal: { show: false } }, category: 2 },
          { id: '24', name: 'MmeThenardier', itemStyle: null, symbolSize: 20.95238266666667, x: 4.6313396, y: -273.8517, attributes: { modularity_class: 7 }, value: 31.428574, label: { normal: { show: false } }, category: 7 },
          { id: '25', name: 'Thenardier', itemStyle: null, symbolSize: 30.095235333333335, x: 82.80825, y: -203.1144, attributes: { modularity_class: 7 }, value: 45.142853, label: { normal: { show: true } }, category: 7 },
          { id: '26', name: 'Cosette', itemStyle: null, symbolSize: 20.95238266666667, x: 78.64646, y: -31.512747, attributes: { modularity_class: 6 }, value: 31.428574, label: { normal: { show: false } }, category: 6 },
          { id: '27', name: 'Javert', itemStyle: null, symbolSize: 31.923806666666668, x: -81.46074, y: -204.20204, attributes: { modularity_class: 7 }, value: 47.88571, label: { normal: { show: true } }, category: 7 },
          { id: '28', name: 'Fauchelevent', itemStyle: null, symbolSize: 8.152382000000001, x: -225.73984, y: 82.41631, attributes: { modularity_class: 4 }, value: 12.228573, label: { normal: { show: false } }, category: 4 },
          { id: '29', name: 'Bamatabois', itemStyle: null, symbolSize: 15.466666666666667, x: -385.6842, y: -20.206686, attributes: { modularity_class: 3 }, value: 23.2, label: { normal: { show: false } }, category: 3 },
          { id: '30', name: 'Perpetue', itemStyle: null, symbolSize: 4.495239333333333, x: -403.92447, y: -197.69823, attributes: { modularity_class: 2 }, value: 6.742859, label: { normal: { show: false } }, category: 2 },
          { id: '31', name: 'Simplice', itemStyle: null, symbolSize: 8.152382000000001, x: -281.4253, y: -158.45137, attributes: { modularity_class: 2 }, value: 12.228573, label: { normal: { show: false } }, category: 2 },
          { id: '32', name: 'Scaufflaire', itemStyle: null, symbolSize: 2.6666666666666665, x: -122.41348, y: 210.37503, attributes: { modularity_class: 1 }, value: 4, label: { normal: { show: false } }, category: 1 },
          { id: '33', name: 'Woman1', itemStyle: null, symbolSize: 4.495239333333333, x: -234.6001, y: -113.15067, attributes: { modularity_class: 1 }, value: 6.742859, label: { normal: { show: false } }, category: 1 },
          { id: '34', name: 'Judge', itemStyle: null, symbolSize: 11.809524666666666, x: -387.84915, y: 58.7059, attributes: { modularity_class: 3 }, value: 17.714287, label: { normal: { show: false } }, category: 3 },
          { id: '35', name: 'Champmathieu', itemStyle: null, symbolSize: 11.809524666666666, x: -338.2307, y: 87.48405, attributes: { modularity_class: 3 }, value: 17.714287, label: { normal: { show: false } }, category: 3 },
          { id: '36', name: 'Brevet', itemStyle: null, symbolSize: 11.809524666666666, x: -453.26874, y: 58.94648, attributes: { modularity_class: 3 }, value: 17.714287, label: { normal: { show: false } }, category: 3 },
          { id: '37', name: 'Chenildieu', itemStyle: null, symbolSize: 11.809524666666666, x: -386.44904, y: 140.05937, attributes: { modularity_class: 3 }, value: 17.714287, label: { normal: { show: false } }, category: 3 },
          { id: '38', name: 'Cochepaille', itemStyle: null, symbolSize: 11.809524666666666, x: -446.7876, y: 123.38005, attributes: { modularity_class: 3 }, value: 17.714287, label: { normal: { show: false } }, category: 3 },
          { id: '39', name: 'Pontmercy', itemStyle: null, symbolSize: 6.323809333333333, x: 336.49738, y: -269.55914, attributes: { modularity_class: 6 }, value: 9.485714, label: { normal: { show: false } }, category: 6 },
          { id: '40', name: 'Boulatruelle', itemStyle: null, symbolSize: 2.6666666666666665, x: 29.187843, y: -460.13132, attributes: { modularity_class: 7 }, value: 4, label: { normal: { show: false } }, category: 7 },
          { id: '41', name: 'Eponine', itemStyle: null, symbolSize: 20.95238266666667, x: 238.36697, y: -210.00926, attributes: { modularity_class: 7 }, value: 31.428574, label: { normal: { show: false } }, category: 7 }];
        const link = [{ id: '0', name: null, source: '1', target: '0', lineStyle: { normal: {} } }, { id: '1', name: null, source: '2', target: '0', lineStyle: { normal: {} } }, { id: '2', name: null, source: '3', target: '0', lineStyle: { normal: {} } }, { id: '3', name: null, source: '3', target: '2', lineStyle: { normal: {} } }, { id: '4', name: null, source: '4', target: '0', lineStyle: { normal: {} } }, { id: '5', name: null, source: '5', target: '0', lineStyle: { normal: {} } }, { id: '6', name: null, source: '6', target: '0', lineStyle: { normal: {} } }, { id: '7', name: null, source: '7', target: '0', lineStyle: { normal: {} } }, { id: '8', name: null, source: '8', target: '0', lineStyle: { normal: {} } }, { id: '9', name: null, source: '9', target: '0', lineStyle: { normal: {} } }, { id: '13', name: null, source: '11', target: '0', lineStyle: { normal: {} } }, { id: null, name: null, source: '11', target: '2', lineStyle: { normal: {} } }, { id: '11', name: null, source: '11', target: '3', lineStyle: { normal: {} } }, { id: '10', name: null, source: '11', target: '10', lineStyle: { normal: {} } }, { id: '14', name: null, source: '12', target: '11', lineStyle: { normal: {} } }, { id: '15', name: null, source: '13', target: '11', lineStyle: { normal: {} } }, { id: '16', name: null, source: '14', target: '11', lineStyle: { normal: {} } }, { id: '17', name: null, source: '15', target: '11', lineStyle: { normal: {} } }, { id: '18', name: null, source: '17', target: '16', lineStyle: { normal: {} } }, { id: '19', name: null, source: '18', target: '16', lineStyle: { normal: {} } }, { id: '20', name: null, source: '18', target: '17', lineStyle: { normal: {} } }, { id: '21', name: null, source: '19', target: '16', lineStyle: { normal: {} } }, { id: '22', name: null, source: '19', target: '17', lineStyle: { normal: {} } }, { id: '23', name: null, source: '19', target: '18', lineStyle: { normal: {} } }, { id: '24', name: null, source: '20', target: '16', lineStyle: { normal: {} } }, { id: '25', name: null, source: '20', target: '17', lineStyle: { normal: {} } }, { id: '26', name: null, source: '20', target: '18', lineStyle: { normal: {} } }, { id: '27', name: null, source: '20', target: '19', lineStyle: { normal: {} } }, { id: '28', name: null, source: '21', target: '16', lineStyle: { normal: {} } }, { id: '29', name: null, source: '21', target: '17', lineStyle: { normal: {} } }, { id: '30', name: null, source: '21', target: '18', lineStyle: { normal: {} } }, { id: '31', name: null, source: '21', target: '19', lineStyle: { normal: {} } }, { id: '32', name: null, source: '21', target: '20', lineStyle: { normal: {} } }, { id: '33', name: null, source: '22', target: '16', lineStyle: { normal: {} } }, { id: '34', name: null, source: '22', target: '17', lineStyle: { normal: {} } }, { id: '35', name: null, source: '22', target: '18', lineStyle: { normal: {} } }, { id: '36', name: null, source: '22', target: '19', lineStyle: { normal: {} } }, { id: '37', name: null, source: '22', target: '20', lineStyle: { normal: {} } }, { id: '38', name: null, source: '22', target: '21', lineStyle: { normal: {} } }, { id: '47', name: null, source: '23', target: '11', lineStyle: { normal: {} } }, { id: '46', name: null, source: '23', target: '12', lineStyle: { normal: {} } }, { id: '39', name: null, source: '23', target: '16', lineStyle: { normal: {} } }, { id: '40', name: null, source: '23', target: '17', lineStyle: { normal: {} } }, { id: '41', name: null, source: '23', target: '18', lineStyle: { normal: {} } }, { id: '42', name: null, source: '23', target: '19', lineStyle: { normal: {} } }, { id: '43', name: null, source: '23', target: '20', lineStyle: { normal: {} } }, { id: '44', name: null, source: '23', target: '21', lineStyle: { normal: {} } }, { id: '45', name: null, source: '23', target: '22', lineStyle: { normal: {} } }, { id: null, name: null, source: '24', target: '11', lineStyle: { normal: {} } }, { id: '48', name: null, source: '24', target: '23', lineStyle: { normal: {} } }, { id: '52', name: null, source: '25', target: '11', lineStyle: { normal: {} } }, { id: '51', name: null, source: '25', target: '23', lineStyle: { normal: {} } }, { id: '50', name: null, source: '25', target: '24', lineStyle: { normal: {} } }, { id: null, name: null, source: '26', target: '11', lineStyle: { normal: {} } }, { id: null, name: null, source: '26', target: '16', lineStyle: { normal: {} } }, { id: '53', name: null, source: '26', target: '24', lineStyle: { normal: {} } }, { id: '56', name: null, source: '26', target: '25', lineStyle: { normal: {} } }, { id: '57', name: null, source: '27', target: '11', lineStyle: { normal: {} } }, { id: '58', name: null, source: '27', target: '23', lineStyle: { normal: {} } }, { id: null, name: null, source: '27', target: '24', lineStyle: { normal: {} } }, { id: '59', name: null, source: '27', target: '25', lineStyle: { normal: {} } }, { id: '61', name: null, source: '27', target: '26', lineStyle: { normal: {} } }, { id: '62', name: null, source: '28', target: '11', lineStyle: { normal: {} } }, { id: '63', name: null, source: '28', target: '27', lineStyle: { normal: {} } }, { id: '66', name: null, source: '29', target: '11', lineStyle: { normal: {} } }, { id: '64', name: null, source: '29', target: '23', lineStyle: { normal: {} } }, { id: '65', name: null, source: '29', target: '27', lineStyle: { normal: {} } }, { id: '67', name: null, source: '30', target: '23', lineStyle: { normal: {} } }, { id: null, name: null, source: '31', target: '11', lineStyle: { normal: {} } }, { id: null, name: null, source: '31', target: '23', lineStyle: { normal: {} } }, { id: null, name: null, source: '31', target: '27', lineStyle: { normal: {} } }, { id: '68', name: null, source: '31', target: '30', lineStyle: { normal: {} } }, { id: '72', name: null, source: '32', target: '11', lineStyle: { normal: {} } }, { id: '73', name: null, source: '33', target: '11', lineStyle: { normal: {} } }, { id: '74', name: null, source: '33', target: '27', lineStyle: { normal: {} } }, { id: '75', name: null, source: '34', target: '11', lineStyle: { normal: {} } }, { id: '76', name: null, source: '34', target: '29', lineStyle: { normal: {} } }, { id: '77', name: null, source: '35', target: '11', lineStyle: { normal: {} } }, { id: null, name: null, source: '35', target: '29', lineStyle: { normal: {} } }, { id: '78', name: null, source: '35', target: '34', lineStyle: { normal: {} } }, { id: '82', name: null, source: '36', target: '11', lineStyle: { normal: {} } }, { id: '83', name: null, source: '36', target: '29', lineStyle: { normal: {} } }, { id: '80', name: null, source: '36', target: '34', lineStyle: { normal: {} } }, { id: '81', name: null, source: '36', target: '35', lineStyle: { normal: {} } }, { id: '87', name: null, source: '37', target: '11', lineStyle: { normal: {} } }, { id: '88', name: null, source: '37', target: '29', lineStyle: { normal: {} } }, { id: '84', name: null, source: '37', target: '34', lineStyle: { normal: {} } }, { id: '85', name: null, source: '37', target: '35', lineStyle: { normal: {} } }, { id: '86', name: null, source: '37', target: '36', lineStyle: { normal: {} } }, { id: '93', name: null, source: '38', target: '11', lineStyle: { normal: {} } }, { id: '94', name: null, source: '38', target: '29', lineStyle: { normal: {} } }, { id: '89', name: null, source: '38', target: '34', lineStyle: { normal: {} } }, { id: '90', name: null, source: '38', target: '35', lineStyle: { normal: {} } }, { id: '91', name: null, source: '38', target: '36', lineStyle: { normal: {} } }, { id: '92', name: null, source: '38', target: '37', lineStyle: { normal: {} } }, { id: '95', name: null, source: '39', target: '25', lineStyle: { normal: {} } }, { id: '96', name: null, source: '40', target: '25', lineStyle: { normal: {} } }, { id: '97', name: null, source: '41', target: '24', lineStyle: { normal: {} } }, { id: '98', name: null, source: '41', target: '25', lineStyle: { normal: {} } }, { id: '101', name: null, source: '42', target: '24', lineStyle: { normal: {} } }, { id: '100', name: null, source: '42', target: '25', lineStyle: { normal: {} } }];
        const ca = [{ name: '类目0' }, { name: '类目1' }, { name: '类目2' }, { name: '类目3' }, { name: '类目4' }, { name: '类目5' }, { name: '类目6' }, { name: '类目7' }, { name: '类目8' }];

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
              layout: 'none',
              nodes: fliterNode,
              links: link,
              categories: ca,
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
        let job = this.$route.query.job;
        let region = this.$route.query.region;
        let range = this.$route.query.range;
        const payload = {
          'job': job,
          'region': region,
          'range': range
        };
        console.log(job)
        const path = 'http://localhost:5000/search';
        axios.post(path, payload)
          .then((res) => {
            console.log(res.data.word_cloud)
            this.word_list = res.data.word_cloud
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    created() {
      this.get_data()
    },
    mounted() {
      setTimeout(() =>{
        this.draw_word_cloud_view()
        this.word_cloud_init_view_data()
        this.draw_graph()
        this.isLoading = false;
        this.isShow = true;
      },1000);



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
