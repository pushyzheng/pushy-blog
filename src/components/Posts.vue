<template>
  <div id="posts">
		<div v-if="showIndexLoading">
      <loading></loading>
    </div>
  	<div class="mdui-container-fluid" style="margin-bottom:200px;" v-else>
			<div id="posts-div">
			<!-- 循环内容文章卡片 -->
			<transition-group name="list" tag="p">
				<div class="mdui-shadow-4 post-card" v-for="(post,postIndex) in indexPostsArray" v-bind:key="post.post_id">
					<!-- 封面和标题部分 -->
					<div class="cover-title" v-bind:style="backgroundImgStyle(post.cover_url)">
						<router-link v-bind:to="toOriginalLink(post.post_id)" class="title-link">
							{{post.title}}
						</router-link>
					</div>
					<!-- 概览部分 -->
					<div style="color:#777777;line-height:1.8;margin:20px 15px">
						<span v-html="postContentFilter(post.body,post.post_id)"></span>
						<router-link v-bind:to="toOriginalLink(post.post_id)" style="color:#1ABC9C">
							阅读原文
						</router-link>
					</div>

					<div class="mdui-divider"></div>
					<!-- 文章信息部分 -->
					<div style="margin-top: 15px;padding-left: 10px;padding-right: 30px;">
							<!-- 文章 标签 -->
							<div class="mdui-chip catagory-label"
									v-bind:class="labelHoverClass(postIndex,CgIndex)"
									v-for="(item,CgIndex) in post.catagory"
									@mouseenter="labelMouseEnter(postIndex,CgIndex)"
									@mouseleave="labelMouseLeave"
									@click="toCatagoryPost(item)"
									>
								<span class="mdui-chip-title">{{item}}</span>
							</div>
							<!-- 发布时间 -->
							<div class="mdui-float-right mdui-valign time-div">
								<i class="mdui-icon material-icons">access_time</i>&nbsp;
								<span v-bind:mdui-tooltip="mduiTooltip(post.create_time)">{{post.create_time | timeFilter}}</span>
							</div>
					</div>
					<br>
				</div>
			</transition-group>
			<div id="readmore-btn-div">
				<button class="mdui-btn mdui-ripple mdui-color-pink-a200 mdui-btn-block mdui-btn-raised"
								@click="readMore" :disabled=showNoAnyPost>
								{{readMoreBtnValue}}
				</button>
			</div>
			</div>
		</div>
  </div>
</template>

<script>
	import axios from 'axios'
	import loading from './loading'
	import mdui from 'mdui'
  import Prism from 'prismjs'

  export default {
		name: "posts",
		components: {
      loading: loading
    },
		data() {
			return {
				// some code
				postIndex:null,
				cgIndex:null,
			}
		},
		computed:{
			pageNum:function() {
				return this.$store.state.pageNum
			},
			indexPostsArray:function() {
				return this.$store.state.indexPostsArray
			},
			cgItemArray:function() {
				return this.$store.state.cgItemArray
			},
			showNoAnyPost:function() {
				return this.$store.state.showNoAnyPost
			},
			showIndexLoading:function() {
				return this.$store.state.showIndexLoading
			},
			readMoreBtnValue:function() {
				return this.$store.state.readMoreBtnValue
			},
			codeDataArray:function() {
				return this.$store.state.codeDataArray
			},
			showNoCodeData:function() {
				return this.$store.state.showNoCodeData
			}
		},
		methods:{
			readMore:function(){
				// 点击“查看更多”触发的事件，1.记录页数状态值+1，2.请求下一页的文章内容
        this.$store.commit('PAGE_INCREMENT');
				this.$store.dispatch('fetchIndexPostsAn')
			},
			postContentFilter:function(content,post_id){
				// console.log(content)
				return content.substring(0,100) + '......'
			},
			backgroundImgStyle:function(imgUrl){
				return "background-image: url(" + imgUrl + ");"
			},
			toOriginal:function(post_id){
				this.$router.push({ name: 'Original', params: { post_id: post_id }})
			},
			toOriginalLink:function(post_id){
				return '/posts/' + post_id
			},
			toCatagoryPost:function(item){
				this.$router.push({ name: 'Catagory', params: { item: item }})
			},
			toTop:function(){
				// 回顶部方法
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			labelHoverClass:function(pIndex,cindex){
				return {
					'mdui-color-pink-a200':this.postIndex == pIndex && this.cgIndex == cindex
				}
			},
			labelMouseEnter(pindex,cindex){
				// 当鼠标悬浮在传入的index索引标签执行的方法，让该标签变颜色
				this.postIndex = pindex
				this.cgIndex = cindex
			},
			labelMouseLeave(){
				// 当鼠标移开标签执行的方法，让所有标签都没颜色
				this.postIndex = null
				this.cgIndex = null
			},
			mduiTooltip:function(updateTime){
				// 显示更新时间绑定属性的方法：
				return "{content: 'updated-" + updateTime + "'}"
			},
			MoreCodeData:function(){
				// 点击“更多代码片段”触发的时间，请求下一页的代码片段：
				this.$store.commit('CODE_PAGE_INCREMENT')
				this.$store.dispatch('fetchCodeDataAn')
			},
			BindCodeDialogId:(id)=> {
				return 'code-dialog-' + id
			},
			BindMduiDialog:(id)=> {
				return "{target: '#code-dialog-" + id + "'}"
			},
			copyCode:(id,body)=> {
        var oInput = document.createElement('input');
        oInput.value = body;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display='none';
        mdui.snackbar({
					message:'复制成功!',
					position:'top'
				})
			}
		},
		created:function(){
		  this.$store.commit('CHANGE_TITLE', "Hello World");
			if (this.pageNum == 1) {
				this.$store.dispatch('fetchIndexPostsAn')
			}
			this.$store.dispatch('fetchCgItemAn')
			this.$store.dispatch('fetchCodeDataAn')
		},
		mounted:function(){
			mdui.mutation();
		},
		updated:function() {
			Prism.highlightAll();
			var $$ = mdui.JQ;
			$$('.token operator').addClass('pre-background-color')
		},
		filters:{
			getItemIntroduce:function(item){
				if (item == 'Vue') {
					return '渐进式的JavaScript框架'
				}else if (item == 'Python') {
					return '人生苦短，我选Python'
				}else if (item == 'Flask') {
					return 'Python编写的轻量级Web应用框架'
				}else if(item == 'HTTP') {
					return 'TCP/IP 协议基础知识'
				}else if (item == 'Others') {
					return '其他知识记录'
				}
			}
		}
  }

</script>


<style scoped>


	a{
		text-decoration: none;
	}
	pre{
		font-size: 16px;
	}
	pre:hover{
		cursor: text
	}
	.mdui-dialog{
		max-width: 900px;
	}

	#readmore-btn-div{
		margin: 0 300px;
	}

	.pre-background-color{
		background-color: #E9ECEF;
	}




	.cover-title{
		background-size:cover;
    background-position: center center;
		color:white;
		padding:20px;
		font-size:34px;
		text-shadow:1px 1px 8px #444;
		font-weight:400;
	}
	.title-link{
		margin:0px;
		margin-top:150px;
		color:white;
		display:block
	}
	.time-div{
		margin-top: 8px;color: #8C8C8C;
		font-weight: bolder;
		font-size: 14px;
	}
	.post-card{
		margin-bottom:30px;
		background-color: white
	}
	/* .post-card:hover{
		box-shadow: rgb(108,105,105) 5px 5px 20px;
	} */
	.catagory-label{
		margin-right: 10px;
	}

	#posts-div{
		margin: 0 500px;
	}
	#loading-text{
		text-align: center;
		font-size: 15px;
		font-weight: bold;
		background-color: #fcf8e3;
		color: #8a6d3b;
		border: 1px solid #faebcc;
		padding: 10px 0;
		width: 400px;
	}

	/* 定义侧边栏目录的样式 */
	.catagory-chip{
		margin: 20px 100px;
		width: 100px;
	}
	#right-catagory-div{
		/* margin-top: 15px; */
	}

	.catagory-item-count{
		color: white
	}

	/* 定义列表加载属性： */
	.list-item {
  display: inline-block;
  margin-right: 10px;
	}
	.list-enter-active, .list-leave-active {
		transition: all 0.5s;
	}
	.list-enter, .list-leave-to
	/* .list-leave-active for below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(30px);
	}

		@media screen and (max-width:840px){
		.cover-title a{
			font-size: 22px;
		}
		#right-catagory-div{
			margin-top: 40px;
		}
		#readmore-btn-div{
		margin: 0 100px;
		}
		#posts-div{
			margin: 0
		}
	}

</style>
