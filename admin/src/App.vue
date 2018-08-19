<template>
  <div id="app">
    <AdminNav v-if="showNavBar"></AdminNav>
    <transition name="slide-fade">
      <router-view v-if="showRouter" :style="routerStyleObject"></router-view>
    </transition>
  </div>
</template>

<script>
import AdminNav from './components/AdminNav'

export default {
  name: 'App',
  components: {
    AdminNav: AdminNav
  },
  data () {
    return {
      showRouter:false,
      showNavBar:false
    }
  },
  computed: {
    routerStyleObject() {
      return {
        minHeight: document.documentElement.clientHeight + 'px'
      }
    }
  },
  mounted:function(){
    this.showRouter = true
  },
  created:function(){
    // 导航栏控制:
    if (this.$route.path == '/allpost' || this.$route.path == '/write' || this.$route.path == '/tag' || this.$route.path == '/code' ) {
      this.showNavBar = true
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slide-fade-enter-active {
    transition: all 0.4s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(200px);
    opacity: 0;
  }

</style>
