<template>
  <div id="app">
    <Jumbotron></Jumbotron>
    <div id="router">
      <transition name="slide-fade">
        <router-view v-if="showRouter"></router-view>
      </transition>
    </div>
    <button class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-pink-a200" @click="toTop" 
            mdui-tooltip="{content: '回顶部'}" id="toTop-fib">
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
  .slide-fade-enter-active {
  transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  .slide-fade-leave-active for below version 2.1.8 {
    transform: translateX(10px);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to .fade-leave-active below version 2.1.8 {
    opacity: 0;
  } */

  .slide-fade-enter-active {
  transition: all .5s ease;
  }
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  } 
</style>
