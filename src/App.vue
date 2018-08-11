<template>
  <div id="app">
    <Jumbotron v-show="!$route.meta.hideInMenu"></Jumbotron>
    <div id="router">
      <transition-group name="list" tag="p">
      <!-- <transition name="slide-fade"> -->
        <router-view v-if="showRouter" key="router" ></router-view>
      <!-- </transition> -->
      </transition-group>
    </div>
    <button class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-pink-a200 mdui-hidden-sm-down" @click="toTop"
            mdui-tooltip="{content: '回顶部'}" id="toTop-fib">
      <i class="mdui-icon material-icons">arrow_upward</i>
    </button>
    <button class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-pink-a200 mdui-fab-mini mdui-hidden-md-up"
            @click="toTop" id="toTop-fib">
      <i class="mdui-icon material-icons">arrow_upward</i>
    </button>
  </div>
</template>

<script>
  import Jumbotron from './components/Jumbotron'

  export default {
    name: 'App',
    components: {
      Jumbotron: Jumbotron
    },
    data() {
      return {
        showRouter:false
      }
    },
    mounted:function(){
      this.showRouter = true
      window.addEventListener('scroll', this.scrollTopStatus)
    },
    methods:{
      toTop:function(){
        document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
      },
      scrollTopStatus:function(){
        var $$ = mdui.JQ;
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.scroll == 0) {
          $$('#toTop-fib').addClass('mdui-fab-hide');
        }else{
          $$('#toTop-fib').removeClass('mdui-fab-hide');
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*color: #2c3e50;*/
    margin-bottom: 50px;
  }
  /* 定义路由的过渡效果
	/* 定义列表加载属性： */
	.list-item {
  display: inline-block;
  margin-right: 10px;
	}
	.list-enter-active {
		transition: all 0.5s;
	}
	.list-enter
	/* .list-leave-active for below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(30px);
	}

</style>
