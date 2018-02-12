var indexUrl = 'http://connect.qq.com/widget/shareqq/index.html'
var url = 'http://pushy.site/posts/1518353639' // 分享网页
var title = 'title' // 分享标题
var summay = 'summay' // 分享摘要
var pics = 'http://static.pushy.site/personal/gravatar.jpg' // 分享图片
var site = 'QQ分享'

var shareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&summary=${summay}&pics=${pics}&flash=&site=&style=201&width=32&height=32&showcount=`
console.log(shareUrl)
var shareQ = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&summary=${summay}&pics=${pics}`
console.log(shareQ);