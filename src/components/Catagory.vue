<template>
  <div id="catagory">
    <div v-if="showLoading">
      <loading></loading>
    </div>
    <!-- 当请求的标签内容没有文章内容显示的部分： -->
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <div v-if="showError" id="no-content-div" class="mdui-container">
        <h3>抱歉！找不到该标签下的文章内容.</h3>
        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-a200" @click="goHome">
          <i class="mdui-icon material-icons">home</i>
          &nbsp;&nbsp;回主页
        </button>
      </div>
    </transition>
    <!-- 有文章内容时显示的部分 -->
    <div class="mdui-container" v-if="CatagoryPostsArray">
      <div id="catagory-title">
        <h1 id="title-text" style="margin-bottom:10px;">{{this.$route.params.item | capitalize}}</h1>
        <div class="mdui-divider"></div>
      </div>
    <div class="mdui-shadow-4 post-card" v-for="(post,postIndex) in CatagoryPostsArray" v-bind:key="post.post_id">
      <!-- 封面和标题部分 -->
      <div id="cover-title" v-bind:style="backgroundImgStyle(post.cover_url)">
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
            <span v-bind:mdui-tooltip="mduiTooltip(post.create_time)">{{post.create_time}}</span>
          </div>
      </div>
      <br>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import loading from '../components/loading'

  export default {
    name: "catagory",
    components: {
      loading: loading
    },
    data (){
      return {
        showLoading:false,
        showError:false,
        CatagoryPostsArray:null,
        postIndex:null,
				cgIndex:null,
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchCatagoryPosts'
    },
    methods:{
      fetchCatagoryPosts:function(){
        this.showError = false
        this.post = null
        this.showLoading = true
        var self = this
        var item = this.$route.params.item
        axios.get('https://api.pushy.site/catagory/' + item).then(response=>{
          if (response.data.data.length == 0) {
            // 返回的数组为零，该目录下没有文章
            console.log('没有文章内容')
            self.showLoading = false
            self.showError = true
          }else{
            self.CatagoryPostsArray = response.data.data
            self.showLoading = false
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      backgroundImgStyle:function(imgUrl){
				return "background-image: url(" + imgUrl + ");"
			},
      goHome:function(){
        this.$router.push({ path: '/' })
      },
      toOriginal:function(post_id){
				this.$router.push({ name: 'Original', params: { post_id: post_id }})
      },
      toOriginalLink:function(post_id){
				return '/posts/' + post_id
      },
      postContentFilter:function(content){
				console.log(content)
				return content.substring(0,100) + '......'
      },
      mduiTooltip:function(updateTime){
				// 显示更新时间绑定属性的方法：
				return "{content: 'updated-" + updateTime + "'}"
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
    },
    created:function(){
      this.fetchCatagoryPosts()
    },
    mounted:function(){
			// 初始化mdui的圆形进度条组件
			mdui.mutation()
		}
  }

</script>


<style scoped>

  a{
		text-decoration: none;
	}

	@media screen and (max-width:840px){
		#cover-title a{
			font-size: 22px;
		}
	}
  #cover-title{
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
		margin-top:220px;
		color:white;
		display:block
	}
  @media screen and (max-width:840px){
		.title-link {
			margin-top:150px;
		}
	}

	.time-div{
		margin-top: 8px;color: #8C8C8C;
		font-weight: bolder;
		font-size: 14px;
	}
	.post-card{
		margin-bottom:20px;
    background-color: white;
	}

  #no-content-div{
    text-align: center
  }
  #catagory-title{
    text-align: center;
    margin-bottom: 50px;
  }
</style>
