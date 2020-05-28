<template>
  <div class="bg">
    <div class="container">
      <div class="row" style="height: 100px"></div>
      <div class="row">
        <div class="col-md-8">
        </div>
        <div class="card col-md-4">
          <div class="card-body">
            <h4 class="card-title text-center">登录</h4>
            <hr>
            <form>
              <div class="form-group">
                <label for="email">邮箱地址：</label>
                <input v-model="email" @focusin="refresh_tip" type="email" class="form-control" id="email">
              </div>
              <div class="form-group">
                <label for="password">密码：</label>
                <input v-model="password" @focusin="refresh_tip" type="password" class="form-control" id="password">
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="pwcheck">
                <label class="form-check-label" style="font-size: small" for="pwcheck">记住密码</label>
              </div>
              <div style="margin-top: -10px;color: red" v-show="show_warning" >
                <span>邮箱地址或密码错误</span>
              </div>
              <div style="margin-top: -10px;color: red" v-show="show_tip" >
                <span>邮箱地址或密码不能为空</span>
              </div>
              <button type="button" class="btn btn-primary" @click="toIndex" style="width: 140px;margin-right: 20px">登录</button>
              <button type="button" class="btn btn-secondary" @click="toRegister" style="width: 140px">注册</button>
              <!--之后改成type="submit"类型-->
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
    name: "Login",
    data(){
      return{
        email:'',
        password: '',
        show_warning: false,
        show_tip: false
      }
    },
    methods:{
      refresh_tip(){
        this.show_warning = false;
        this.show_tip = false
      },
      toIndex(){
        if(this.email === '' || this.password === ''){
          this.show_tip = true
        }
        else{
          const path = 'http://localhost:5000/login';
          const payload = {
            'email': this.email,
            'password':this.password
          };
          axios.post(path, payload)
            .then(res => {
              this.status = res.data.status;
              if(this.status === true) {
                sessionStorage.setItem('user',this.email);
                this.$router.push('/index')
              }
              else
                this.show_warning = true;
            })
        }
      },
      toRegister(){
        this.$router.push('/register')
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
