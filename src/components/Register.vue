<template>
  <div class="bg">
    <div class="container">
      <div class="row" style="height: 100px"></div>
      <div class="row">
        <div class="col-md-8">
        </div>
        <div class="card col-md-4">
          <div class="card-body">
            <h4 class="card-title text-center">注册</h4>
            <hr>
            <form>
              <div class="form-group">
                <input v-model="form.email" @focusin="refresh_tip1" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="邮箱地址" required>
              </div>
              <div style="margin-top: -15px;color: red" v-show="show_tip1" >
                <span>请填写正确地址</span>
              </div>
              <div class="form-group">
                <input v-model="form.username" @focusin="refresh_tip2" type="text" class="form-control" id="username" aria-describedby="nameHelp" placeholder="用户名" required>
                <small id="nameHelp" class="form-text text-muted">长度不小于3个字符，不大于20个字符</small>
              </div>
              <div style="margin-top: -15px;color: red" v-show="show_tip2" >
                <span>长度不符合</span>
              </div>
              <div class="form-group">
                <input v-model="form.password" @focusin="refresh_tip3" type="password" class="form-control" id="password" placeholder="密码" aria-describedby="pwHelp" required>
                <small id="pwHelp" class="form-text text-muted">长度不小于6个字符，不大于20个字符</small>
              </div>
              <div style="margin-top: -15px;color: red" v-show="show_tip3" >
                <span>长度不符合</span>
              </div>
              <div class="form-group">
                <input v-model="password2" @focusin="refresh_tip4" type="password" class="form-control" id="comfirmpw" placeholder="确认密码" required>
              </div>
              <div style="margin-top: -10px;color: red" v-show="show_tip4" >
                <span>密码不一致</span>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.role" class="form-check-input" type="radio" name="role" id="student" value="1" checked>
                <label class="form-check-label" for="student">在校学生</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.role" class="form-check-input" type="radio" name="role" id="teacher" value="2">
                <label class="form-check-label" for="teacher">高校教师</label>
              </div>
              <button type="button" class="btn btn-primary" @click="onsubmit" style="width: 308px;margin-top:10px;">提交注册</button>
              <div style="margin-top: 10px;color: red" v-show="show_warning" >
                <span>邮箱已存在，请直接<a href="/login">登录</a></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Register",
    data(){
      return{
        form:{
          email:'',
          username: '',
          password:'',
          role: 1
        },
        password2:'',
        show_tip1: false,
        show_tip2: false,
        show_tip3: false,
        show_tip4: false,
        show_warning: false,
        status: false,
      }
    },
    methods:{
      refresh_tip1(){
        this.show_tip1 = false
      },
      refresh_tip2(){
        this.show_tip2 = false
      },
      refresh_tip3(){
        this.show_tip3 = false
      },
      refresh_tip4(){
        this.show_tip4 = false
      },
      toBack (payload) {
        const path = 'http://localhost:5000/register';
        axios.post(path, payload)
          .then((res) => {
            console.log(payload)
            this.status = res.data.status;
            if(this.status === true) {
              sessionStorage.setItem('user',this.form.email);
              this.$router.push('/index')
            }
            else
              this.show_warning = true;
            console.log(res.data)
            console.log(res)
          })
          .catch((error) => {
            console.log(error)
          })
      },
      onsubmit () {
        if(this.form.password !== this.password2)
          this.show_tip4=true;
        if(this.form.email === '')
          this.show_tip1=true;
        if(this.form.username.length >20 || this.form.username.length < 3)
          this.show_tip2=true;
        if(this.form.password.length >20 || this.form.password.length < 6)
          this.show_tip3=true;
        if(this.show_tip1 || this.show_tip2 || this.show_tip3 || this.show_tip4 === false){
          const payload = {
            form: this.form
          };
          this.toBack(payload)
        }
      }
    }
  }
</script>

<style scoped>
  .bg{
    background-image: url("../assets/img/login-bg.jpg");
    background-repeat: no-repeat;
    background-attachment:fixed;
    background-position: center center;
    width: 1366px;
    height: 657px;
  }
</style>
