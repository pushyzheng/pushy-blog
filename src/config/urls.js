// let domain = "http://localhost:9999";
let domain = "https://api.pushy.site";


export default {
  post: {
    postList (pageNum) {
      return domain + `/posts/?page=${pageNum}`
    },
    detail (id) {
      return domain + `/posts/${id}`
    }
  },
  category: {
    cgList: domain + '/catagory/items'
  }
}
