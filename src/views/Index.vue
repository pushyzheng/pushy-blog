<template>
  <div id="posts">
		<div v-if="showIndexLoading">
      <loading></loading>
    </div>
  	<div class="mdui-container-fluid" style="margin-bottom:200px;" v-else>
      <div id="posts-div" class="my-container">
        <!-- 循环内容文章卡片 -->
        <transition-group name="list" tag="p">
          <div class="post-card" v-for="(post,postIndex) in indexPostsArray" v-bind:key="post.post_id">
            <!-- 封面和标题部分 -->
            <div class="cover-title" v-bind:style="backgroundImgStyle(post.cover_url)">
              <router-link v-bind:to="toDetailLink(post.post_id)" class="title-link">
                {{post.title}}
              </router-link>
            </div>
            <!-- 概览部分 -->
            <div style="color:#777777;line-height:1.8;margin:20px 15px">
              <span v-html="postContentFilter(post.body,post.post_id)"></span>
              <router-link v-bind:to="toDetailLink(post.post_id)" style="color:#1ABC9C">
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
        <div id="read-more-btn">
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
	import loading from '../components/loading'
	import mdui from 'mdui'

  export default {
    name: "posts",
    components: { loading },
    data() {
      return {
        // some code
        postIndex: null,
        cgIndex: null
      }
    },
    computed: {
      pageNum: function () {
        return this.$store.state.pageNum
      },
      indexPostsArray: function () {
        return this.$store.state.indexPostsArray
      },
      cgItemArray: function () {
        return this.$store.state.cgItemArray
      },
      showNoAnyPost: function () {
        return this.$store.state.showNoAnyPost
      },
      showIndexLoading: function () {
        return this.$store.state.showIndexLoading
      },
      readMoreBtnValue: function () {
        return this.$store.state.readMoreBtnValue
      },
      codeDataArray: function () {
        return this.$store.state.codeDataArray
      },
      showNoCodeData: function () {
        return this.$store.state.showNoCodeData
      }
    },
    methods: {
      readMore: function () {
        // 点击“查看更多”触发的事件，1.记录页数状态值+1，2.请求下一页的文章内容
        this.$store.commit('PAGE_INCREMENT');
        this.$store.dispatch('fetchIndexPostsAn')
      },
      backgroundImgStyle (imgUrl){
        return "background-image: url(" + imgUrl + ");"
      },
      postContentFilter(content, post_id) {
        console.log(content.substring(0, 100));
        return content.substring(0, 100).replace('##', '') + '......'
      },
      toDetail: function (post_id) {
        this.$router.push({name: 'Original', params: {post_id: post_id}})
      },
      toDetailLink: function (post_id) {
        return '/posts/' + post_id
      },
      toCatagoryPost: function (item) {
        this.$router.push({name: 'Catagory', params: {item: item}})
      },
      toTop: function () {
        // 回顶部方法
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      labelHoverClass: function (pIndex, cindex) {
        return {
          'mdui-color-pink-a200': this.postIndex == pIndex && this.cgIndex == cindex
        }
      },
      labelMouseEnter(pindex, cindex) {
        // 当鼠标悬浮在传入的index索引标签执行的方法，让该标签变颜色
        this.postIndex = pindex
        this.cgIndex = cindex
      },
      labelMouseLeave() {
        // 当鼠标移开标签执行的方法，让所有标签都没颜色
        this.postIndex = null
        this.cgIndex = null
      },
      mduiTooltip: function (updateTime) {
        // 显示更新时间绑定属性的方法：
        return "{content: 'updated-" + updateTime + "'}"
      },
    },
    created: function () {
      document.title = "首页 - Pushy"
      this.$store.commit('CHANGE_TITLE', "So give me reason to prove me wrong");
      this.$store.commit('CHANGE_URL', 'https://static.pushy.site/personal/blog-cover.jpg');
      if (this.pageNum === 1) {
        this.$store.dispatch('fetchIndexPostsAn')
      }
      this.$store.dispatch('fetchCgItemAn');
      this.$store.dispatch('fetchCodeDataAn')
    },
    mounted: function () {
      mdui.mutation();
    },
    updated: function () {
      var $$ = mdui.JQ;
      $$('.token operator').addClass('pre-background-color')
    }
  };

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

	#read-more-btn{
		margin: 0 300px;
	}

	.cover-title{
		background-size:cover;
    background-position: center center;
		color:white;
		padding:20px;
		font-size:28px;
		text-shadow:1px 1px 8px #444;
		font-weight:400;
    text-decoration: none;
	}
	.title-link {
    margin: 0px;
    margin-top: 150px;
    color: white;
    display: block
  }
	.time-div{
		margin-top: 8px;color: #8C8C8C;
		font-weight: bolder;
		font-size: 14px;
	}
	.post-card{
		margin-bottom:30px;
		background-color: white;
    border-radius: 15px;
    box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
	}

	.catagory-label{
		margin-right: 10px;
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

		#read-more-btn{
		  margin: 0 100px;
		}
	}

</style>
