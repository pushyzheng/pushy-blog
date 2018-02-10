import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Catagory from '@/components/Catagory'
import Original from '@/components/Original'
import notfound from '@/components/notfound'
import AboutMe from '@/components/AboutMe'

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
      component: Posts
    },
    {
      path: '/posts/',
      redirect:'/'
    },
    {
      path: '/posts/catagory/:item',
      name:'Catagory',
      component:Catagory
    },
    {
      path: '/posts/:post_id',
      name: 'Original',
      component: Original
    },
    {
      path: '/aboutme',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '*',
      name: 'notfound',
      component: notfound
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
