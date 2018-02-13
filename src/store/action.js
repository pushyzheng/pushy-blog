import * as types from './mutation-types'
import axios from 'axios'
import store from '../store'

export default {
  // 处理文章内容状态部分：
  fetchIndexPostsAn ({ commit }) {
    var pageNum = store.state.pageNum
    axios.get('http://api.pushy.site/posts/?page=' + pageNum).then(response=>{
      if (response.data.data.length == 0){
        commit(types.NO_ANY_POSTS) // 显示没有任何文章可以加载了
        commit(types.CHANGE_BTN_VALUE)
      }
        commit('HIDDEN_INDEX_LOADING')
        commit(types.FETCH_INDEX_POST,response.data.data)
    }).catch(error=>{
      commit('HIDDEN_INDEX_LOADING')
    })
  },
  // 处理标签状态部分：
  fetchCgItemAn ({ commit }) {
    axios.get('http://api.pushy.site/catagory/return_all_item').then(response=>{
      commit(types.LOAD_CATAGORY_ITEM,response.data.data)
    }).catch(error=>{
      console.log(error)
    })
  },
  // 处理代码片段状态部分：
  fetchCodeDataAn ({ commit }) {
    var codePageNum = store.state.codePageNum
    axios.get('http://api.pushy.site/code?page=' + codePageNum).then(response=> {
      if (response.data.data.length == 0) {
        commit('NO_MORE_CODE_DATA')
      }else{
        store.state.codeDataArray = response.data.data
      }
    }).catch(error=> {
      console.log(error)
    })
  }
}
