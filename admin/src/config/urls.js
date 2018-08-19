// let domain = 'http://localhost:9999';
let domain = 'https://api.pushy.site';

export default {
  post: {
    postList: domain + '/posts/return_all_posts',
    add: domain + '/posts/write',
    delete(id) {
      return domain + '/posts/' + id
    },
    update: domain + '/posts/'
  },
  tag: {
    tagList: domain + '/catagory/tags',
    addTag: domain + '/catagory/tags'
  }
}
