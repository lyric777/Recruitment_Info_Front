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
            <a class="nav-link" href="/mark" style="color: black">我的收藏</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout" style="color: black">登出</a>
          </li>
        </ul>
      </div>
    </div><br>

    <b-table :head-variant="headVariant" striped hover :items="items" :fields="fields">
      <template v-slot:cell(tran_state)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1" variant="primary" style="width: 80px">
          查看
        </b-button>
        &nbsp;
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1" variant="secondary" style="width: 80px">
          删除
        </b-button>
      </template>
    </b-table>
    <br><br><br><br>
    <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. </small></p></div>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" ok-title="确认删除">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "Mark",
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [
          {key: 'tranId',label: '查询编号'},
          {key: 'keyword', label: '查询关键字'},
          {key: 'date_range', label: '查询时间段'},
          {key: 'tran_time', label: '收藏时间'},
          {key: 'tran_state', label: '操作'},
        ],
        items: [
          { isActive: true, tranId: 20052002, keyword: '全国-数据产品经理', date_range: '2020-05-2020-05',tran_time:'2020-05-20 19:35',pay_state:'已支定金',tran_state:'未审核' },
          { isActive: true, tranId: 20052001, keyword: '杭州-产品经理助理', date_range: '2020-05-2020-05',tran_time:'2020-05-20 16:09',pay_state:'已退款',tran_state:'已拒绝'  },
          { isActive: false, tranId: 20050101, keyword: '上海-电商产品经理', date_range: '2020-03-2020-04',tran_time:'2020-05-01 21:59',pay_state:'已付定金',tran_state:'已审核', note:'将在2020年1月9日前给出报告结果' },
          { isActive: true,tranId: 20043001, keyword: '广州-数据产品经理', date_range: '2020-04-2020-04',tran_time:'2020-04-30 14:11',pay_state:'已付尾款',tran_state:'已完成' },
          { isActive: true,tranId: 20042301, keyword: '南京-数据产品经理', date_range: '2020-03-2020-04',tran_time:'2020-04-23 20:03',pay_state:'已付尾款',tran_state:'已完成' }

        ],
        headVariant: 'light',
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = '删除操作'
        this.infoModal.content = '编号为'+ this.items[index].tranId + '，确定删除该条记录吗？'
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
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
