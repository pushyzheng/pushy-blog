let domain = "http://localhost:9999";

export default {
  post: {
    postList (pageNum) {
      return domain + `/posts/?page=${pageNum}`
    },
    detail (id) {
      return domain + `/posts/${id}`
    }
  }
}
