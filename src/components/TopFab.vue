<template>
  <div>
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
  export default {
    name: "TopFab",
    methods: {
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
    },
    mounted() {
      window.addEventListener('scroll', this.scrollTopStatus)
    }
  }
</script>

<style scoped>

</style>
