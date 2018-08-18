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
        <img src="https://static.pushy.site/personal/gravatar.jpg"
             class="mdui-img-circle" style="width:60px">
        <div id="drawer-top-text">
          Pushy
        </div>
      </div>
      <div id="drawer-category">
        <div style="text-align: center">
          <h2>标签</h2>
        </div>
        <!-- 分类目录列表 -->
        <div id="category-list">
          <div class="mdui-chip" @click="toCatagoryPost(item.item)" v-for="item in cgItemArray">
            <span class="mdui-chip-icon">{{item.count}}</span>
            <span class="mdui-chip-title">{{item.item | capitalize}}</span>
          </div>
        </div>
      </div>
      <div id="drawer-link">
        <div style="text-align: center">
          在这里也可以找到我
        </div>
        <div style="padding: 10px;">
          <img src="../assets/github.png" class="link-icon"
               @click="openLink('https://github.com/PushyZqin')">
          <img src="../assets/zhihu.png" class="link-icon"
               @click="openLink('https://www.zhihu.com/people/pushyzqin/activities')">
        </div>
      </div>
    </div>
    <!--顶端巨幕-->
      <div id="jumbotron-pic">
          <div id="jumbotron-text" v-if="showTitle">
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
        navBgColor:false,
        showTitle:  false
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
        let inst = new mdui.Drawer('#drawer',{overlay: true});
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
      openLink(url) {
        window.open(url)
      }
    },
    created:function(){
      this.scroll = 0;
      this.$store.dispatch('fetchCgItemAn');
    },
    mounted:function(){
      this.showTitle = true;
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

  /*定义巨幕导航栏的样式*/
  .nav-item-text{
    /*margin: 0 2px!important;*/
    color: white;
    font-size: 22px;
  }

  #drawer{
    background-color: white;
  }

  #drawer-top{
    background-image: url('https://images.unsplash.com/photo-1534448654703-fbfe17f692fb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f917eb80b21c7c5281db2505f0328396&auto=format&fit=crop&w=1950&q=80');
    background-position: center center;
    background-size: cover;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
  }

  #drawer-top-text {
    font-size: 25px;
    font-weight: bolder;
    margin-top: 10px;
  }

  /*标签列表样式*/
  #category-list {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .mdui-chip {
    margin-bottom: 10px;
    margin-right: 5px;
  }

  .link-icon {
    width: 40px;
    cursor: pointer;
  }

  .mdui-collapse-item-body .mdui-list-item{
    padding-left: 16px;
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

</style>
