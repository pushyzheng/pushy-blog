<template>
  <div id="admin-nav">
    <div class="mdui-appbar">
      <div class="mdui-toolbar mdui-color-indigo">
        <a href="javascript:;" class="mdui-typo-title">Pushy Blog Admin</a>
        <div class="mdui-toolbar-spacer"></div>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon" onclick="location.reload()">
          <i class="mdui-icon material-icons">refresh</i>
        </a>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '注销'}"
          @click="logout">
          <i class="mdui-icon material-icons">power_settings_new</i>
        </a>
      </div>
      <div class="mdui-tab mdui-color-indigo" mdui-tab>
        <router-link to="write" class="mdui-ripple mdui-ripple-white">
          <i class="mdui-icon material-icons">mode_edit</i>
          <label>写文章</label>
        </router-link>
        <router-link to="allpost" class="mdui-ripple mdui-ripple-white">
          <i class="mdui-icon material-icons">&#xe02f;</i>
          <label>全部文章</label>
        </router-link>
        <router-link to="tag" class="mdui-ripple mdui-ripple-white">
          <i class="mdui-icon material-icons">people</i>
          <label>标签管理</label>
        </router-link>
        <router-link to="code" class="mdui-ripple mdui-ripple-white">
          <i class="mdui-icon material-icons">code</i>
          <label>代码片段</label>
        </router-link>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'admin-nav',
  methods: {
    logout: function () {
      this.delCookie('accessToken');
      location.href = '/'
    }
  }
}

</script>

<style scoped>

  #admin-nav{
    margin-bottom: 25px;
  }

  a{
    text-decoration: none;
    color:white;
    font-family: "微软雅黑"
  }

</style>
