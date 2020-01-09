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
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">我们不会将您的邮箱地址与其他人分享</small>
              </div>
              <div class="form-group">
                <label for="password">密码：</label>
                <input type="password" class="form-control" id="password">
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="pwcheck">
                <label class="form-check-label" style="font-size: small" for="pwcheck">记住密码</label>
              </div>
              <button type="button" class="btn btn-primary" @click="toIndex" style="width: 140px;margin-right: 20px">登录</button>
              <button type="button" class="btn btn-secondary" @click="register" style="width: 140px">注册</button>
              <!--之后改成type="submit"类型-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Login",
    methods:{
      toIndex(){
        this.$router.push('/index')
      },
      register(){
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
