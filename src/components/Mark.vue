<template>
  <div class="container" v-if="ShowPage">
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
      <template v-slot:cell(operations)="row">
        <b-button size="sm" @click="read_mark(row.item, row.index)" class="mr-1" variant="primary" style="width: 80px">
          查看
        </b-button>
        &nbsp;
        <b-button size="sm" @click="del_mark(row.item, row.index, $event.target)" class="mr-1" variant="secondary" style="width: 80px">
          删除
        </b-button>
      </template>
    </b-table>
    <br><br><br><br>
    <div><p class="text-center" style="color: darkgray"><small>Copyright © 2019-2020 产品经理招聘信息分析系统 All Rights Reserved. </small></p></div>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only ok-title="确认删除" @ok="confirm_del">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Mark",
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        ShowPage: false,
        fields: [
          {key: 'markId',label: '查询编号'},
          {key: 'keyword', label: '查询关键字'},
          {key: 'date_range', label: '查询时间段'},
          {key: 'mark_time', label: '收藏时间'},
          {key: 'operations', label: '操作'},
        ],
        items: [],
        headVariant: 'light',
        infoModal: {
          id: null,
          idx: null,
          title: '删除操作',
          content: ''
        }
      }
    },
    methods: {
      del_mark(item, index, button) {
        this.infoModal.id = item['markId']
        this.infoModal.idx = index
        this.infoModal.content = '编号为'+ this.items[index].markId + '，确定删除该条记录吗？'
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      confirm_del(){
        const payload = {'user': sessionStorage.getItem('user'),'id': this.infoModal.id}
        const path = 'http://localhost:5000/del_mark';
        axios.post(path, payload)
          .then((res) => {
            console.log(res.data.result)
          })
          .catch((error) => {
            console.log(error)
          })
        this.items.splice(this.infoModal.idx,1)
      },
      read_mark(item){
        this.$router.push({
          path: '/result/'+ item.markId,
        })
      },
      logout(){
        sessionStorage.clear();
        this.$router.push('/login')
      },
      get_bookmark(){
        const payload = {'user': sessionStorage.getItem('user')}
        const path = 'http://localhost:5000/get_bookmark';
        axios.post(path, payload)
          .then((res) => {
            this.items = res.data.bookmark
            console.log(this.items)
          })
          .catch((error) => {
            console.log(error)
          })
        this.ShowPage = true
      }
    },
    mounted() {
      this.get_bookmark()
    }
  }
</script>

<style scoped>

</style>
