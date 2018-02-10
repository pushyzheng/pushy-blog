import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  pageNum:1, // 记录当前加载的页数值
  indexPostsArray:[], // 存放首页加载的文章内容数组
  cgItemArray:[],  // 存放首页侧边栏目录的数组
  showNoAnyPost:false, // 显示没有任何文章加载的状态值
  showIndexLoading:true,
  readMoreBtnValue:'more',
  codeDataArray:[],
  codePageNum:1,
  showNoCodeData:false
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
