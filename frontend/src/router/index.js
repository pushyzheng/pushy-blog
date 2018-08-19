import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
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
      name: 'Index',
      meta: {
        title: '首页',
        hideInMenu: false
      },
      component: () => import('@/views/Index'),
    },
    {
      path: '/posts/:post_id',
      name: 'Original',
      meta: {
        title: '文章详情',
        hideInMenu: false
      },
      component: () => import('@/views/Detail')
    },
    {
      path: '/posts/catagory/:item',
      name:'Catagory',
      meta: {
        title: '首页',
        hideInMenu: false
      },
      component:() => import('@/components/Catagory')
    },
    {
      path: '/aboutme',
      name: 'About',
      meta: {
        title: '关于我',
        hideInMenu: false
      },
      component: () => import('@/views/About')
    },
    {
      path: '*',
      name: 'Notfound',
      meta: {
        title: '找不到页面了',
        hideInMenu: true
      },
      component: () => import('@/views/Notfound')
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
