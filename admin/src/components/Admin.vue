<template>
  <div id="admin">
    <div id="login-form">
      <div id="form-title">
        <h1>登录</h1>
      </div>
      <div class="mdui-textfield">
        <input class="mdui-textfield-input login-input" placeholder="管理员账号" v-model="username" required
               style="cursor:text"/>
        <div class="mdui-textfield-error">管理员账号不能为空</div>
      </div>
      <div class="mdui-textfield">
        <input class="mdui-textfield-input login-input" placeholder="密码" v-model="password"
               v-on:keyup.enter="loginAdmin" type="password" required style="cursor:text"/>
        <div class="mdui-textfield-error">密码不能为空</div>
      </div>
      <br><br>
      <button class="mdui-btn mdui-btn-block mdui-color-pink-a200 mdui-ripple mdui-center mdui-btn-raised"
              @click="loginAdmin" v-bind:disabled="showBtnDisabled">
        进入后台
      </button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'admin',
  data () {
    return {
      username: '',
      password: '',
      showBtnDisabled: false
    }
  },
  methods: {
    loginAdmin: function () {
      if (this.username !== '' && this.password !== '') {
        this.showBtnDisabled = true;
        let self = this;
        axios.post('https://api.pushy.site/auth/login', {
          username: self.username,
          password: self.password
        }).then(response => {
          if (response.data.error_code === 0) {
            // 登录成功执行的执行的代码块：
            self.SetAccessToken(response.data.data.access_token);
            location.href = '/write'
          } else {
            // 登录失败执行的代码块：
            mdui.snackbar({
              message: '身份验证失败！请重新登录！'
            })
          }
        }).catch(error => {
          console.log(error.data)
        })
      } else {
        mdui.snackbar({
          message: '请填写账号和密码'
        })
      }
    },
    SetAccessToken: function (token) {
      let expireDays = 1000 * 60 * 60 * 24 * 15; // 设置access_token的过期时间
      this.setCookie('accessToken', token, expireDays)
    }
  }
}

</script>

<style scoped>
    body{
        background-color: #F5F5F5;
    }

    #form-title{
      text-align: center;
    }

    #login-form {
      width: 400px;
      background-color: white;
      padding: 20px 50px;
    }

    #admin{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-input {
    }

    .login-input:hover{
      cursor: text
    }
</style>
