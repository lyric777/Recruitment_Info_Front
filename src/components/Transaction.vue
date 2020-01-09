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
            <a class="nav-link" :href="'/transaction/'+userId" style="color: black">我的订单</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" style="color: black">个人</a>
          </li>
        </ul>
      </div>
    </div><br>

    <b-table :head-variant="headVariant" striped hover :items="items" :fields="fields">
      <template v-slot:cell(tran_state)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1" variant="primary" style="width: 80px">
          查看
        </b-button>
      </template>
    </b-table>
    <br><br><br><br>
    <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. 备案号：京ICP备10000000号-1</small></p></div>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "Transaction",
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [
          {key: 'tranId',label: '订单号'},
          {key: 'keyword', label: '订单关键字'},
          {key: 'date_range', label: '查询时间段'},
          {key: 'tran_time', label: '下单时间'},
          {key: 'pay_state', label: '支付状态'},
          {key: 'tran_state', label: '订单状态'},
        ],
        items: [
          { isActive: true, tranId: 19120012, keyword: '北京-市场经理', date_range: '2019-12',tran_time:'2020-01-02 19:35',pay_state:'已支定金',tran_state:'未审核' },
          { isActive: true, tranId: 19120010, keyword: '沈阳-市场经理', date_range: '2019-12',tran_time:'2020-01-01 16:09',pay_state:'已退款',tran_state:'已拒绝'  },
          { isActive: false, tranId: 19120009, keyword: '上海-市场经理', date_range: '2019-12',tran_time:'2019-12-31 21:59',pay_state:'已付定金',tran_state:'已审核', note:'将在2020年1月9日前给出报告结果' },
          { isActive: true,tranId: 19120002, keyword: '广州-市场经理', date_range: '2019-12',tran_time:'2019-12-31 14:11',pay_state:'已付尾款',tran_state:'已完成' },
          { isActive: true,tranId: 19110339, keyword: '南京-市场经理', date_range: '2019-11',tran_time:'2019-12-28 20:03',pay_state:'已付尾款',tran_state:'已完成' }

        ],
        userId: 19232,
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
        this.infoModal.title = this.items[index].tran_state
        this.infoModal.content = '需求：\n查询'+ this.items[index].keyword + '在' + this.items[index].date_range + '数据'
          + (this.items[index].note? ('\n审核结果：' + this.items[index].note): '')
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
    }
  }
</script>

<style scoped>

</style>
