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
        <!-- <a href="javascript:;" class="mdui-btn mdui-btn-icon" style="color: white"><i class="mdui-icon material-icons">search</i></a> -->
      </div>
    </div>
    <div class="mdui-drawer mdui-drawer-close" id="drawer">
      <div id="drawer-top">
        <div>
            <img src="http://static.pushy.site/personal/gravatar.jpg" class="mdui-img-fluid mdui-img-circle" style="width:60px">
        </div>
        <div style="margin-top:20px;">
          在这里你能查看到分类和归档信息
          <br>
          还有一些代码片段
        </div>
      </div>
      <div>
      <!-- 分类目录列表 -->
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item mdui-collapse-item-open">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">label</i>
            <div class="mdui-list-item-content" style="font-family:consolas">分类</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB"
                @click="toCatagoryPost(item.item)" v-for="item in cgItemArray">
                <span class="mdui-color-indigo mdui-list-item-avatar mdui-icon catagory-item-count">
									{{item.count}}
								</span>
              <div style="margin-left:32px;">{{item.item | capitalize}}</div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 归档列表 -->
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">date_range</i>
            <div class="mdui-list-item-content" style="font-family:consolas">归档</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple date-list-item" style="background-color:#EBEBEB;">2018年1月</li>
            <li class="mdui-list-item mdui-ripple date-list-item" style="background-color:#EBEBEB;">2018年2月</li>
            <li class="mdui-list-item mdui-ripple date-list-item" style="background-color:#EBEBEB;">2018年3月</li>
          </ul>
        </li>
      </ul>
      <!-- 代码片段列表 -->
      <ul class="mdui-list" mdui-collapse="{accordion: true}" style="max-width: 360px;">
        <li class="mdui-collapse-item">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">code</i>
            <div class="mdui-list-item-content" style="font-family:consolas">代码片段</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list">
            <li class="mdui-list-item mdui-ripple" style="background-color:#EBEBEB">None</li>
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

				<!-- <div class="mdui-col-md-3 mdui-hidden-sm-down">
					<div class="mdui-card mdui-shadow-8" id="right-catagory-div">
						<div class="mdui-center" style="text-align:center;margin: 20px 0;">
							<h2><i class="mdui-icon material-icons">&#xe06d;</i>&nbsp;Catagory</h2>
						</div>
						<div class="mdui-divider"></div>
						<ul class="mdui-list mdui-list-dense">
							<li class="mdui-list-item mdui-ripple" @click="toCatagoryPost(item.item)" v-for="item in cgItemArray">
								<div class="mdui-list-item-content">
									<div class="mdui-list-item-title">{{item.item | capitalize}}</div>
								</div>
								<span class="mdui-color-indigo mdui-list-item-avatar mdui-icon catagory-item-count">
									{{item.count}}
								</span>
							</li>
						</ul>
					</div>
					<div class="mdui-card mdui-shadow-8" style="margin-top:20px;">
						<div class="mdui-center" style="text-align:center;margin: 20px 0;">
							<h2><i class="mdui-icon material-icons">code</i>&nbsp;Code</h2>
						</div>
						<div class="mdui-divider"></div>
						<div id="code-item-list">
							<ul class="mdui-list mdui-list-dense">
								<li class="mdui-list-item mdui-ripple" :mdui-dialog="BindMduiDialog(code.id)"
									v-for="code in codeDataArray">
									<div class="mdui-list-item-content" style="color:#616161">{{code.title}}</div>
									<div class="mdui-dialog" :id="BindCodeDialogId(code.id)">
										<div class="code-dialog-body" style="margin:20px;">
											<h2 class="code-title" style="text-align:center;margin-bottom:10px;">{{code.title}}</h2>
											<div class="code-content" v-html="code.content"></div>
										</div>
										<div>
											<button class="mdui-fab mdui-ripple mdui-center mdui-color-blue-700"
															@click="copyCode(code.id,code.body)">
												<i class="mdui-icon material-icons">content_copy</i>
											</button>
										</div>
										<br>
									</div>
								</li>
							</ul>
						</div>
						<div>
							<button class="mdui-btn mdui-btn-block mdui-ripple mdui-color-blue-700 mdui-btn-raised"
											@click="MoreCodeData" :disabled="showNoCodeData">
								更多代码片段
							</button>
						</div>
					</div>
				</div> -->

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
    computed:{
			cgItemArray:function() {
				return this.$store.state.cgItemArray
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
      },
      toCatagoryPost:function(item){
        var inst = new mdui.Drawer('#drawer');
        var $$ = mdui.JQ;
        inst.close(); // 关闭抽屉导航栏
        $$.hideOverlay();  // 隐藏遮罩
        $$.unlockScreen();  // 解锁屏幕
				this.$router.push({ name: 'Catagory', params: { item: item }})
			},
    },
    created:function(){
      this.scroll = 0
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

  .jumbotron-text::selection{color:#fff;background:#B3D4FB;}
  .jumbotron-text::-moz-selection{color:#fff;background:#B3D4FB;}
  .jumbotron-text::-webkit-selection{color:#fff;background:#B3D4FB;}

  /*定义巨幕的样式*/
  #jumbotron{
    background-color: black;
    background-image: url("../assets/test/3.jpg");
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

  .mdui-collapse-item-body .mdui-list-item{
    padding-left: 16px;
  }

</style>
