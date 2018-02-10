<template>
  <div class="original">
		<!-- <div v-if="showLoading">
			<loading></loading>
		</div> -->
		<div class="mdui-container-fluid" id="post-container" >
			<div class="mdui-card post-card">
		<!-- <transition name="fade"> -->
				<!-- <div  v-if="originalObj"> -->
				<div>
					<div class="mdui-shadow-2">
						<div id="cover-title" v-bind:style="backgroundImgStyle(originalObj.cover_url)">
								<div id="post-title">{{originalObj.title}}</div>
						</div>
					</div>
					<div class="mdui-row" style="margin-top:20px;">
						<div class="mdui-col-md-3">
							<div class="mdui-row">
								<div class="mdui-col-md-6" style="width:80px;margin-left:20px;">
									<img src="https://avatars2.githubusercontent.com/u/31270926?s=400&u=20e747be9a91e0b87d6d44d7632e54a55fb9b03f&v=4" class="mdui-img-circle mdui-img-fluid">
								</div>
								<div class="mdui-col-md-6">
									<div style="margin-top:11px;">
										<div style="color:#ABAAAA;margin-bottom:5px;">Pushy</div>
										<!-- <div class="mdui-divider"></div> -->
										<div style="color:#ABAAAA">2018年2月5日</div>
									</div>
								</div>
							</div>
						</div>
						<div class="mdui-col-md-5"></div>
						<div class="mdui-col-md-4 ">
							<div style="color:#ABAAAA;margin-top:19px;">
								共计<span style="margin:0 5px;">{{originalObj.body | wordCount(originalObj.body) }}</span>字 &nbsp;|&nbsp;预计阅读{{originalObj.body | readtime(originalObj.body)}}分钟
								<a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '分享该文章'}"><i class="mdui-icon material-icons">&#xe80d;</i></a>
							</div>
						</div>
					</div>
					<div id="card-content">
						<div class="mdui-card-media">
								<div id="post-content" v-html="originalObj.content"></div>
						</div>
					</div>
					<div style="color:#ABAAAA;float: right;margin-right: 30px;margin-top: 20px;">
							转载请注明出处:
							<a href="#" style="color:#1ABC9C" mdui-tooltip="{content: 'http://pushy.site'}">
								Pushy
							</a>
					</div>
					<div class="mdui-divider" style="margin-top: 100px;"></div>
					<div style="margin:40px;" class="mdui-center">
						<transition name="fade" mode="out-in">
							<button class="mdui-fab mdui-ripple mdui-color-red mdui-center" v-if="good" key="notGood" @click="begood">
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
		<!-- </transition> -->

			</div>
		</div>
  </div>

</template>

<script>
	import axios from 'axios'
	import loading from '../components/loading'
	import mdui from 'mdui'
  import Prism from 'prismjs'

  export default {
		name: "original",
		data() {
			return {
				originalObj:{cover_url:'http://120.78.165.238:4311/cover-1517724201.png',title:'haha',content:'ahah',body:'body'},
				showLoading:false,
				good:true
			}
		},
		components: {
      loading: loading
    },
		methods:{
			loadOriginalObj:function(){
				this.showPost = null
				this.showLoading = true
				var self = this
				var post_id = this.$route.params.post_id
				axios.get('http://120.78.165.238:4000/api/posts/' + post_id).then(function(response){
					console.log(response.data.data)
					self.showLoading = false
					self.originalObj = response.data.data
				})
			},
			backgroundImgStyle:function(imgUrl){
				return "background-image: url(" + imgUrl + ");"
			},
			reRunPrism:function(){
				// Prism.highlightAll();
			},
			requestGood:function(){
				axios.post('http://120.78.165.238:4000/api/posts/like',{
					post_id:this.$route.params.post_id
				}).then(response=>{
					mdui.snackbar({
						message: '已经有' + response.data.data.good + '个人对这篇文章点了赞',
						position:'left-top'
					});
				}).catch(error=>{
					console.log(error)
				})
			},
			havegoodStatus:function(){
				var post_id = this.$route.params.post_id
				console.log(localStorage[post_id])
				if (localStorage[post_id]) {
					this.good = false
				}
			},
			begood:function(){
				this.good = !this.good
				this.requestGood()
				var post_id = this.$route.params.post_id
				localStorage[post_id] = post_id

			}
		},
		filters:{
			wordCount:function(value){
				// 计算文章的总字数
				return value.length
			},
			readtime:function(value){
				// 计算阅读时间：
				var length = value.length
				var time = length / 250
				return parseInt(time)
			}
		},
		created:function(){
			this.loadOriginalObj()
			this.havegoodStatus()
		},
		watch:{
			// 如果路由有变化，会再次执行该方法
			'$route': 'loadOriginalObj'
		},
		mounted:function(){
			// 初始化mdui的圆形进度条组件
			mdui.mutation()
		},
		updated:function(){
			this.reRunPrism()
			console.log('更新了！')
		}
  }

</script>

<style scoped>

	#cover-title{
		background-size:cover;
    background-position: center center;
		color:white;
		padding:20px;
		font-size:34px;
		text-shadow:1px 1px 8px #444;
		font-weight:400;
	}
	/* 定义正文中卡片和文字的样式 */
	#post-container{
		margin-top: 50px;
	}
	#post-title{
		margin:0px;
		margin-top:210px;
		color:white;
		display:block
	}
	#card-content{
		margin: 30px;
	}

	#post-content{
		margin-top: 30px;
		font-size: 16px;
		line-height: 1.8;
		color:#616161
	}
	.post-card{
		box-shadow:rgb(167, 163, 163) 5px 5px 20px;
		margin:0 300px;
	}
	.post-card:hover{
		box-shadow: rgb(108,105,105) 5px 5px 20px;
	}

	/* 手机端适应样式 */
	@media screen and (max-width:840px){
		#post-title {
			font-size: 22px;
			margin-top: 150px;
		}
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
	}

	.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}



</style>
