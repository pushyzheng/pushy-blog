<template>
  <div id="jumbotron" :style="styleObject">
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
      </div>
    </div>
    <div class="mdui-drawer mdui-drawer-close" id="drawer">
      <div id="drawer-top">
        <div>
            <img src="https://static.pushy.site/personal/gravatar.jpg" class="mdui-img-fluid mdui-img-circle" style="width:60px">
        </div>
      </div>
      <div>
      <!-- 分类目录列表 -->
      <div @click="toCatagoryPost(item.item)" v-for="item in cgItemArray">
        <div class="mdui-chip" style="float: left;margin: 5px;">
          <span class="mdui-chip-icon">{{item.count}}</span>
          <span class="mdui-chip-title">{{item.item | capitalize}}</span>
        </div>
      </div>
      </div>
    </div>
    <!--顶端巨幕-->
      <div id="jumbotron-pic">
        <div id="jumbotron-text">
          <p class="jumbotron-text" style="margin-bottom:20px;">{{ jumbotronTitle }}</p>
          <!--<p class="jumbotron-text">你还见过多少人</p>-->
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
        navBgColor:false
      }
    },
    computed:{
			cgItemArray:function() {
				return this.$store.state.cgItemArray
			},
      jumbotronTitle () {
			  return this.$store.state.jumbotronTitle
      },
      jumbotronUrl () {
			  return this.$store.state.jumbotronUrl
      },
      styleObject () {
			  return {
			    backgroundImage: 'url(' + this.$store.state.jumbotronUrl + ')'
        }
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
        let inst = new mdui.Drawer('#drawer',{overlay:true});
        inst.open();
      },
      toCatagoryPost:function(item){
        let inst = new mdui.Drawer('#drawer');
        let $$ = mdui.JQ;
        inst.close(); // 关闭抽屉导航栏
        $$.hideOverlay();  // 隐藏遮罩
        $$.unlockScreen();  // 解锁屏幕
				this.$router.push({ name: 'Catagory', params: { item: item }})
			},
    },
    created:function(){
      this.scroll = 0;
      this.$store.dispatch('fetchCgItemAn')
    },
    mounted:function(){
			mdui.mutation();
		},
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: white;
  }

  /*定义巨幕的样式*/
  #jumbotron{
    background-color: black;
    /*background-image: url("../assets/test/3.jpg");*/
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

  #drawer-top{
    background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905888767,767561608&fm=27&gp=0.jpg');
    height: 130px;
    padding-left: 20px;
    padding-top: 70px;
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

  .mdui-collapse-item-body .mdui-list-item{
    padding-left: 16px;
  }

</style>
