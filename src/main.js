// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 设置cookie函数，传入三个参数，分别为：键名，值，过期时间
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

// 得到cookie函数，传入cookie的键名：
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

Vue.prototype.getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

// 删除cookie的函数，传入cookie的键名：
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

// 定义一个全局转换大写的过滤器：
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('timeFilter',function(value) {
  var time = new Date()
  var b_time = new Date(Date.parse(value.replace(/-/g,  "/")));
  var current_year = time.getFullYear()
  var current_Month = time.getMonth()
  var current_Day = time.getDate()
  var back_current_year = b_time.getFullYear()
  var back_current_Month = b_time.getMonth()
  var back_current_Day = b_time.getDate()
  if (back_current_year < current_year) {
    var diff = current_year - back_current_year
    return diff + '年前发布'
  }else{
    if (back_current_Month == current_Month && current_Day - back_current_Day >0 && current_Day - back_current_Day <10){
      var diff = current_Day - back_current_Day
      console.log(diff)
      return diff + '天前发布'
    }else{
      return value
    }
  }
})