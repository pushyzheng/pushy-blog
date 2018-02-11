<template>
  <div id="jumbotron">
    <div class="mdui-appbar mdui-shadow-0">
      <div class="mdui-toolbar" id="jumbotron-nav"
           v-bind:class="{'mdui-color-indigo': navBgColor,'mdui-shadow-2':navBgColor}">
        <a href="javascript:;" class="mdui-btn mdui-btn-icon" @click="openDrawer"
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
    <div class="mdui-drawer mdui-drawer-close" id="drawer">
      <div id="drawer-top">
        <div>
            <img src="https://avatars2.githubusercontent.com/u/31270926?s=400&u=36dcb7f1bc7d5abc7e02cabaf7c5be68f32e998e&v=4" class="mdui-img-fluid mdui-img-circle" style="width:60px">
        </div>
      </div>
      <div>
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item mdui-collapse-item-open">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">label</i>
            <div class="mdui-list-item-content" style="font-family:consolas">分类</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Overview</li>
            <li class="mdui-list-item mdui-ripple " style="background-color:#EBEBEB">All Pages</li>
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Landing Pages</li>
          </ul>
        </li>
      </ul>
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">date_range</i>
            <div class="mdui-list-item-content" style="font-family:consolas">归档</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Overview</li>
            <li class="mdui-list-item mdui-ripple " style="background-color:#EBEBEB">All Pages</li>
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Landing Pages</li>
          </ul>
        </li>
      </ul>
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">code</i>
            <div class="mdui-list-item-content" style="font-family:consolas">代码片段</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Overview</li>
            <li class="mdui-list-item mdui-ripple " style="background-color:#EBEBEB">All Pages</li>
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Landing Pages</li>
          </ul>
        </li>
      </ul>
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">contacts</i>
            <div class="mdui-list-item-content" style="font-family:consolas">联系我</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">
              <i class="mdui-list-item-icon mdui-icon material-icons">contacts</i>
              <div style="margin-left:32px;">1437876073@qq.com</div>
            </li>
            <li class="mdui-list-item mdui-ripple " style="background-color:#EBEBEB">All Pages</li>
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">Landing Pages</li>
          </ul>
        </li>
      </ul>
      </div>
    </div>
    <!--顶端巨幕-->
      <div id="jumbotron-pic">
        <div id="jumbotron-text">
          <p class="jumbotron-text" style="margin-bottom:20px;">像我这样碌碌无为的人</p>
          <p class="jumbotron-text">你还见过多少人</p>
        </div>
      </div>
  </div>
</template>

<script>
  import mdui from 'mdui'

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
      },
      openDrawer:function() {
        var inst = new mdui.Drawer('#drawer',{overlay:true});
        inst.open();
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
    background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905888767,767561608&fm=27&gp=0.jpg');
    height: 180px;
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

  @media screen and (min-width: 1024px){
    .mdui-drawer {
        width: 280px;
        max-width: none;
    }
    .mdui-drawer-close {
      transform: translateX(-290px);
    }
  }

  .mdui-collapse-item-body .mdui-list-item{
    padding-left: 16px;
  }

</style>
