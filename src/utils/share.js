let shareQQ = (url, post) => {
  let title = post.title; // 分享标题
  let summay = post.body; // 分享摘要
  let pics = post.cover_url; // 分享封面
  let shareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&summary=${summay}&pics=${pics}`;
  console.log(shareUrl);
  window.open(shareUrl)
};


let shareQzone = (url, post) => {
  let title = post.title;
  let summay = post.body;
  let pics = post.cover_url;
  let shareQzoneUrl = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&summary=${summay}&pics=${pics}`
  window.open(shareQzoneUrl)
};

export default {
  shareQQ,
  shareQzone
}
