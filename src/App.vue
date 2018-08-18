<template>
  <div id="app">
    <Jumbotron v-show="!$route.meta.hideInMenu"></Jumbotron>
    <div id="router">
      <transition-group name="list" tag="p">
        <router-view v-if="showRouter" key="router" ></router-view>
      </transition-group>
    </div>
    <!--页脚-->
    <footer id="footer" class="mdui-shadow-8">
      <p>Copyright © 2018 Powered by Pushy</p>
      <p>All rights reserved</p>
    </footer>
    <top-fab />
  </div>
</template>

<script>
  import Jumbotron from './components/Jumbotron'
  import TopFab from './components/TopFab'

  export default {
    name: 'App',
    components: { TopFab, Jumbotron },
    data() {
      return {
        showRouter:false
      }
    },
    mounted:function(){
      this.showRouter = true
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /* 定义路由的过渡效果 */
	.list-item {
    display: inline-block;
    margin-right: 10px;
	}
	.list-enter-active {
		transition: all 0.5s;
	}
	.list-enter {
		opacity: 0;
		transform: translateY(80px);
	}

  /*页脚样式*/
  #footer{
    background-color: #0E0E0E;
    text-align: center;
    color: #B4B4B4;
    padding: 30px;
  }

  #router {
    min-height: 1000px;
  }

  /*容器样式类*/
  @media screen and (min-width:840px){
    .my-container {
      margin: 0 250px;
    }
  }

  @media screen and (min-width:1700px){
    .my-container {
      margin: 0 500px;
    }
  }


</style>
