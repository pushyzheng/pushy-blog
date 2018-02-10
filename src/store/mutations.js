import * as types from './mutation-types'

export default {
  [types.PAGE_INCREMENT] (state) {
    state.pageNum ++
  },
  [types.LOAD_CATAGORY_ITEM] (state, itemArray) {
    state.cgItemArray = itemArray
  },
  [types.FETCH_INDEX_POST] (state, newIndexPostArry) {
    state.indexPostsArray = state.indexPostsArray.concat(newIndexPostArry)
  },
  [types.NO_ANY_POSTS] (state) {
    state.showNoAnyPost = true
  },
  [types.HIDDEN_INDEX_LOADING] (state) {
    state.showIndexLoading = false
  },
  [types.CHANGE_BTN_VALUE] (state) {
    state.readMoreBtnValue = 'no more'
  },
  [types.CODE_PAGE_INCREMENT] (state) {
    state.codePageNum ++
  },
  [types.NO_MORE_CODE_DATA] (state) {
    state.showNoCodeData = true
  }

}