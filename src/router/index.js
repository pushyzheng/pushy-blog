import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: () => import('@/components/Posts')
    },
    {
      path: '/posts/',
      redirect:'/'
    },
    {
      path: '/posts/catagory/:item',
      name:'Catagory',
      component:() => import('@/components/Catagory')
    },
    {
      path: '/posts/:post_id',
      name: 'Original',
      component: () => import('@/components/Original')
    },
    {
      path: '/aboutme',
      name: 'AboutMe',
      component: () => import('@/components/AboutMe')
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('@/components/notfound')
    },
  ],
  // 添加scrollBehavior方法，当切换路由时都跳转到页面的顶部 
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
