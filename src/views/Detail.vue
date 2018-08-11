<template>
  <div class="original">
		<div class="mdui-container-fluid" id="post-container" >
			<div class="post-card">
				<div>
					<div class="mdui-row" style="margin-top:20px;">
						<!-- 头像和日期一栏 -->
						<div class="mdui-col-md-3">
							<div class="mdui-row">
								<div class="mdui-col-md-6 mdui-col-xs-6" style="width:80px;margin-left:20px;">
									<img src="https://static.pushy.site/personal/gravatar.jpg" class="mdui-img-circle mdui-img-fluid">
								</div>
								<div class="mdui-col-md-6 mdui-col-xs-6">
									<div style="margin-top:11px;">
										<div style="color:#ABAAAA;margin-bottom:5px;">Pushy</div>
										<div style="color:#ABAAAA">{{post.create_time}}</div>
									</div>
								</div>
							</div>
						</div>
						<div class="mdui-col-md-5"></div>
						<!-- 分享和文章阅读信息一栏 -->
						<div class="mdui-col-md-4">
							<div style="color:#ABAAAA;margin-top:19px;" id="share-div">
								<a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '分享该文章'}" mdui-menu="{target: '#share-attr'}">
									<i class="mdui-icon material-icons">&#xe80d;</i>
								</a>
								<ul class="mdui-menu" id="share-attr">
									<li class="mdui-menu-item">
										<a href="javascript:;" class="mdui-ripple" @click="shareQQ">
											<i class="mdui-menu-item-icon mdui-icon material-icons">person</i>分享到QQ
										</a>
									</li>
									<li class="mdui-menu-item">
										<a href="javascript:;" class="mdui-ripple" @click="shareQzone">
											<i class="mdui-menu-item-icon mdui-icon material-icons">share</i>
											<span>分享到QQ空间</span>
										</a>
									</li>
									<li class="mdui-menu-item">
										<a href="javascript:;" class="mdui-ripple">
											<i class="mdui-menu-item-icon mdui-icon material-icons">people</i>
											<span>分享到微博</span>
										</a>
									</li>
								</ul>
								<a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '在其他设备上阅读'}"
									 mdui-menu="{target: '#others-attr',position:'center'}">
									<i class="mdui-icon material-icons">smartphone</i>
								</a>
								<div id="others-attr" class="mdui-menu">
									<img style="width:250px;" v-bind:src="post.post_url">
								</div>
								&nbsp;&nbsp;共计<span style="margin:0 5px;">{{post.body.length }}</span>字
								&nbsp;|&nbsp;预计阅读{{post.body | readTimeFilter(post.body)}}分钟
							</div>
						</div>
					</div>
					<div id="card-content">
						<div class="mdui-card-media">
								<div id="post-content" v-html="post.content" class="markdown-body"></div>
						</div>
					</div>
					<div style="color:#ABAAAA;float: right;margin-right: 30px;margin-top: 20px;">
							转载请注明出处:
							<a style="color:#1ABC9C;cursor:point;" mdui-tooltip="{content: 'https://pushy.site'}">
								Pushy
							</a>
					</div>
					<div class="mdui-divider" style="margin-top: 100px;"></div>
					<div style="margin:40px;" class="mdui-center">
						<transition name="fade" mode="out-in">
							<button class="mdui-fab mdui-ripple mdui-color-red mdui-center" v-if="good" key="notGood" @click="like">
								<i class="mdui-icon material-icons">battery_alert</i>
							</button>
							<button class="mdui-fab mdui-ripple mdui-color-grey-600 mdui-center" v-else key="good">
								<i class="mdui-icon material-icons">battery_full</i>
							</button>
						</transition>
						<div style="text-align:center;color:#ABAAAA" v-if="good">
							<p style="margin-top:20px;margin-bottom:15px;">如果你觉得这篇文章对你有帮助</p>
							<p>可以给这篇文章点赞!</p>
						</div>
						<div style="text-align:center;color:#ABAAAA" v-else>
							<p style="margin-top:20px;margin-bottom:15px;">谢谢你的支持！</p>
							<p>我会努力创作出更好的文章！</p>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>

</template>

<script>
	import loading from '../components/loading'
	import mdui from 'mdui'
  import urls from '../config/urls'
  import shareUtil from '../utils/share'

  export default {
    name: "original",
    data() {
      return {
        post: {
          title: 'loading...',
          content: 'loading...',
          body: 'loading...'
        },
        showLoading: false,
        good: true
      }
    },
    components: {
      loading: loading
    },
    methods: {
      getPost: function () {
        this.showLoading = true;
        let self = this;
        this.$http.get(urls.post.detail(this.$route.params.post_id)).then(function (response) {
          document.title = response.data.data.title;
          self.showLoading = false;
          self.post = response.data.data;
          self.$store.commit('CHANGE_TITLE', self.post.title);
          self.$store.commit('CHANGE_URL', self.post.cover_url);
        })
      },
      requestGood: function () {
        this.$http.post('https://api.pushy.site/posts/like', {
          post_id: this.$route.params.post_id
        }).then(response => {
          mdui.snackbar({
            message: '已经有' + response.data.data.good + '个人对这篇文章点了赞',
            position: 'left-top'
          });
        }).catch(error => {
          console.log(error)
        })
      },
      isLike () {
        if (localStorage[this.$route.params.post_id]) {
          this.good = false
        }
      },
      like: function () {
        this.good = !this.good;
        this.requestGood();
        let post_id = this.$route.params.post_id;
        localStorage[post_id] = post_id
      },
      // 分享QQ的方法：
      shareQQ () {
        shareUtil.shareQQ(location.href, this.post)
      },
      // 分享QQ空间的方法
      shareQzone () {
        shareUtil.shareQzone(location.href, this.post);
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getPost'
    },
    created: function () {
      this.getPost();
      this.isLike()
    },
    mounted: function () {
      // 初始化mdui的圆形进度条组件
      mdui.mutation()
    }
  }

</script>

<style scoped>

  .markdown-body img {
    width: 20px;
  }

	.mdui-menu{
		width: 200px;
	}
	/* 定义正文中卡片和文字的样式 */
	#post-container{
		margin-top: 50px;
	}
	.post-card{
		margin:0 400px;
	}
  #post-content {
    /*line-height: 1.6;*/
  }

	/* 手机端适应样式 */
	@media screen and (max-width:840px){
		#card-content{
			margin: 15px;
		}
		.post-card {
			margin: 0px;
		}
		#post-content{
			font-size: 14px;
		}
		#post-container{
			margin-top: 20px;
		}
		#share-div{
			margin-left: 18px;
		}
	}

</style>
