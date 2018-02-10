<template>
  <div id="jumbotron">
    <div class="mdui-appbar mdui-shadow-0">
      <div class="mdui-toolbar" id="jumbotron-nav"
           v-bind:class="{'mdui-color-indigo': navBgColor,'mdui-shadow-2':navBgColor}">
        <a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-drawer="{target:'#drawer',overlay:true,swipe:true}"
        style="color: white;">
          <i class="mdui-icon material-icons">menu</i>
        </a>
        <router-link to="/">
          <div class="mdui-typo-title" style="font-weight:bold;color:white;">首页</div>
        </router-link>
        <router-link to="/aboutme">
          <div class="mdui-typo-title" style="font-weight:bold;color:white;">关于我</div>
        </router-link>
        <div class="mdui-toolbar-spacer"></div>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon" style="color: white"><i class="mdui-icon material-icons">search</i></a>
      </div>
    </div>
    <!--顶端巨幕-->
      <div id="jumbotron-pic">
        <div id="jumbotron-text">
          <p class="jumbotron-text" style="margin-bottom:20px;">像我这样碌碌无为的人</p>
          <p class="jumbotron-text">你还见过多少人</p>
        </div>
      </div>
    <!-- 侧边抽屉式导航栏 -->
    <div class="mdui-drawer mdui-drawer-close" id="drawer">
      <div id="drawer-top">
        <div id="drawer-top-text">
          <div style="font-size:25px;">Pushy</div>
          <div style="font-size:15px;margin-top:8px;">I try so hard and get so far.</div>
        </div>
      </div>
      <ul class="mdui-list">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">code</i>
          <div class="mdui-list-item-content">首页</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">people</i>
          <div class="mdui-list-item-content">友情链接</div>
        </li>
        <li class="mdui-subheader">你觉得不错可以分享给你的好友</li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">share</i>
          <div class="mdui-list-item-content">分享到QQ空间</div>
        </li>
        <li class="mdui-subheader">在这里也可以找到我</li>
        <li class="mdui-list-item mdui-ripple" onclick="window.open('https://github.com/PushyZqin')">
          <div style="margin-right: 36px;">
            <img src="../assets/github.png" style="width:40px;">
          </div>
          <div class="mdui-list-item-content">Github</div>
        </li>
        <li class="mdui-list-item mdui-ripple" onclick="window.open('https://www.kancloud.cn/@pushy')">
          <div style="margin-right: 36px;">
            <img src="../assets/kanyun.png" style="width:40px;">
          </div>
          <div class="mdui-list-item-content">看云</div>
        </li>
        <li class="mdui-list-item mdui-ripple" onclick="window.open('https://weibo.com/u/6185196148')">
          <div style="margin-right: 36px;">
            <img src="../assets/weibo.png" style="width:40px;">
          </div>
          <div class="mdui-list-item-content">Weibo</div>
        </li>
        <li class="mdui-list-item mdui-ripple" onclick="window.open('https://space.bilibili.com/62979394/#/')">
          <div style="margin-right: 36px;">
            <img src="../assets/bilibili.png" style="width:40px;">
          </div>
          <div class="mdui-list-item-content">BiliBili</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "jumbotron",
    data(){
      return {
        scroll:'',
        navBgColor:false,
      }
    },
    methods:{
      menu:function(){
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(this.scroll)
       	if (this.scroll > 600){
           this.navBgColor = true
       	}else{
           this.navBgColor = false
         }
      }

    },
    created:function(){
      this.scroll = 0
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: white;
  }

  .jumbotron-text::selection{color:#fff;background:#B3D4FB;}
  .jumbotron-text::-moz-selection{color:#fff;background:#B3D4FB;}
  .jumbotron-text::-webkit-selection{color:#fff;background:#B3D4FB;}

  /*定义巨幕的样式*/
  #jumbotron{
    /* background-color: #3F51B5; */
    background-color: black;
    /* background-image: url("../assets/jumbotron.jpg"); */
    background-image: url("../assets/test/3.jpg");
    /* background-image: url("https://res.jianhui.org/Bergamo/assets/single-img/bg@2x.jpg?imageMogr2/format/webp/quality/70"); */
    background-size:cover;
    background-position: center center;
    margin-bottom: 25px;
    opacity: 1;
  }
  #jumbotron-pic{
    padding: 210px;
    text-align: center;
  }
  #jumbotron-pic:after{
    background:rgba(0,0,0,.4)
  }
  .jumbotron-text{
    font-size: 26px;
    color:white;
    font-weight: bold;
  }

  @media screen and (max-width:840px){
    #jumbotron-pic{
      padding: 80px;
      text-align: center;
    }
    .jumbotron-text{
      font-size: 18px;
      color:white;
      font-weight: bold;
    }
	}

  #drawer-top{
    background-image: url('../assets/test/1.jpg');
    height: 200px;
    background-position: center center;
    background-size: cover;
    color: white
  }
  /*定义巨幕导航栏的样式*/
  .nav-item-text{
    /*margin: 0 2px!important;*/
    color: white;
    font-size: 22px;
  }

  #drawer{
    background-color: white;
    /* background-image: url('../assets/jumbotron.jpg') */
  }
  #drawer-top-text{
    padding-top: 123px;
    padding-left: 25px;
  }
  .drawer-list-text{
    font-weight: bolder
  }
</style>
