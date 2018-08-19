import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import Write from '@/components/Write'
import Tag from '@/components/Tag'
import AllPost from '@/components/AllPost'
import Code from '@/components/Code'
import notfound from '@/components/notfound'


Vue.use(Router)

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/write',
      name: 'Write',
      component: Write,
      beforeEnter:(to, form, next) => {
        var accessToken = getCookie('accessToken')
        if (accessToken) {
          next()
        }else{
          if (to.path == '/'){
            next()
          }else{
            next('/')
          }
        }
      }
    },
    {
      path: '/allpost',
      name: 'AllPost',
      component: AllPost,
      beforeEnter:(to, form, next) => {
        var accessToken = getCookie('accessToken')
        if (accessToken) {
          // cookie中存在accessToken,跳转到/allpost路由
          next()
        }else{
          if (to.path == '/'){
            next()
          }else{
            next('/')
          }
        }
      }
    },
    {
      path: '/code',
      name: 'Code',
      component: Code,
      beforeEnter:(to, form, next) => {
        var accessToken = getCookie('accessToken')
        if (accessToken) {
          // cookie中存在accessToken,跳转到/allpost路由
          next()
        }else{
          if (to.path == '/'){
            next()
          }else{
            next('/')
          }
        }
      }
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag,
      beforeEnter:(to, form, next) => {
        var accessToken = getCookie('accessToken');
        if (accessToken) {
          next()
        }else{
          if (to.path === '/'){
            next()
          }else{
            next('/')
          }
        }
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: notfound
    },
  ]
})
