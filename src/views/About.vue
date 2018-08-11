<template>
    <div id="about-me">
      <div class="mdui-container" id="post-container" >
        <div class="mdui-card" style="padding:20px 0">
          <div id="card-content">
            <div class="mdui-row">
              <div class="mdui-col-md-3">
                <div class="mdui-card-media" id="aboutme-left-div">
                  <div id="my_gravatar" class="mdui-center">
                    <img src="https://static.pushy.site/personal/gravatar.jpg" class="mdui-img-fluid mdui-img-circle">
                  </div>
                  <div>
                    <div style="text-align:center">
                      <h1 style="margin:15px 0">Pushy</h1>
                    </div>
                    <div style="color:#ABAAAA;margin-bottom:30px;text-align:center" id="welcome-content">
                      <p>你好！</p>
                      <p>这是我的个人博客网站</p>
                      <p>如果你喜欢</p>
                      <p>可以点击下边的按钮支持我</p>
                    </div>
                    <transition name="fade" mode="out-in">
                      <button class="mdui-btn mdui-btn-block mdui-color-red mdui-ripple" v-if="unlike" @click="toLike" key="like">
                        <i class="mdui-icon material-icons">favorite</i>&nbsp;&nbsp;LIKE
                      </button>
                      <button class="mdui-btn mdui-btn-block mdui-ripple mdui-color-grey-600" key="liked">
                        <i class="mdui-icon material-icons">mood</i>&nbsp;&nbsp;LIKED
                      </button>
                    </transition>
                    <div style="margin-top:20px;margin-bottom:15px;text-align:center">
                      <p style="margin-bottom:20px">截止建站到目前为止</p>
                      <p>已经收获了&nbsp;<span style="color:#F44336;font-weight:bolder">{{likeCount}}</span>&nbsp;个LIKE了</p>
                    </div>
                    <div class="mdui-divider mdui-hidden-sm-down"></div>
                    <div style="text-align:center;margin-bottom:20px;margin-top:30px;color:#ABAAAA;" class="mdui-hidden-sm-down">
                      个人项目和代码库
                    </div>
                    <div class="mdui-center">
                      <div class="mdui-chip mdui-center mdui-hidden-sm-down" style="margin-bottom:20px;"
                            onclick="window.open('https://github.com/PushyZqin')">
                        <span class="mdui-chip-icon mdui-color-blue"> <i class="mdui-icon material-icons">link</i></span>
                        <span class="mdui-chip-title" style="font-family:consolas">GitHub</span>
                      </div>
                      <div class="mdui-chip mdui-center mdui-hidden-sm-down" style="margin-bottom:20px;"
                            onclick="window.open('https://github.com/PushyZqin/blog-frontend')">
                        <span class="mdui-chip-icon mdui-color-blue"> <i class="mdui-icon material-icons">link</i></span>
                        <span class="mdui-chip-title" style="text-align:center;font-family:consolas">blog-frontend</span>
                      </div>
                      <div class="mdui-chip mdui-center mdui-hidden-sm-down" style="margin-bottom:20px;"
                            onclick="window.open('https://github.com/PushyZqin/blog-backend-api')">
                        <span class="mdui-chip-icon mdui-color-blue"> <i class="mdui-icon material-icons">link</i></span>
                        <span class="mdui-chip-title" style="text-align:center;font-family:consolas">blog-backend-api</span>
                      </div>
                      <div class="mdui-chip mdui-center mdui-hidden-sm-down" style="margin-bottom:20px;"
                            onclick="window.open('https://github.com/PushyZqin/java-notes')">
                        <span class="mdui-chip-icon mdui-color-blue"> <i class="mdui-icon material-icons">link</i></span>
                        <span class="mdui-chip-title" style="text-align:center;font-family:consolas">java-notes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mdui-col-md-9">
                <div class="mdui-card-media" id="aboutme-right-div">
                    <div key="item">
                      <div id="item-div-first">
                        <div class="aboutme-title"><h2 style="margin:0">个人介绍</h2></div>
                        <div class="mdui-divider" style="margin-bottom:20px;"></div>
                        <div id="introduction-div">
                          <blockquote>&nbsp;&nbsp;首先很荣幸你能浏览到我的博客，不论是我在平台宣传还是机缘巧合。不过后者的可能性不大，因为这个网站是由Flask提供后端api，Vue做
                          前端的SPA单页面应用，尽管我预渲染了主要的网页，但是SEO效果注定会不好（虽然Vue也支持SSR服务端渲染，但是基于操作难度大，并且如果不是过多的频繁更新
                          路由，可能预渲染更适合）。</blockquote>
                          <p>&nbsp;&nbsp;我目前大二本科在读，定位河北某高校，专业非科班，但是从大二上开始热爱编程，从而走上制造bug的道路一去不复回。</p>
                          <p>&nbsp;&nbsp;所学的知识呢，一丁半点，没有科班的计算机基础教学，都是整天滚爬摸打积累，半天学不懂一个async。</p>
                          <p>&nbsp;&nbsp;这个个人博客网站呢，是我花了大概三周多的时间搭建而成的，托管在阿里云。如果你对此感兴趣，可以浏览我的
                            <a href="https://github.com/PushyZqin" style="color:rgb(26, 188, 156)" target="_blank">GitHub</a>，
                            或者通过下面的联系方式联系我。
                          </p>
                        </div>
                      </div>
                      <div class="aboutme-title"><h2>联系我</h2></div>
                      <div class="mdui-divider"></div>
                      <div id="contact-me-blockquote">
                        <blockquote style="color:#616161;line-height:2">
                          不论是技术上的问答和交流，都可通过邮箱和QQ联系我，欢迎热爱编程的人来找我
                        </blockquote>
                      </div>
                      <div class="personal-list">
                        <ul class="mdui-list mdui-list-dense">
                          <li class="mdui-list-item mdui-ripple item-list">Email：
                            1437876073@qq.com
                          </li>
                          <li class="mdui-list-item mdui-ripple item-list">QQ：
                            <a href="https://static.pushy.site/personal/qq_qrcode.jpg" style="color:rgb(26, 188, 156)" target="_blank">1437876073</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <br><br>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


       <br><br><br><br><br>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "about-me",
    data () {
      return {
        unlike:true,
        likeCount:'',
        showMsg:false
      }
    },
    methods:{
      toLike:function(){
        this.unlike = false
        this.likeCount ++
      },
      getLikeCount:function(){
        var self = this;
        this.likeCount = 'loading'
        axios.get('https://api.pushy.site/blog/like').then(response=>{
          self.likeCount = response.data.data.like
        })
      }
    },
    created:function(){
      this.getLikeCount()
    }
  }
</script>=

<style scoped>

  li{
    margin-bottom: 10px;
  }
  .personal-list{
    margin:0 30px;padding:10px;
  }
  img:hover{
    cursor: pointer
  }
  #my_gravatar{
    width: 180px;
  }
  #card-content{
    margin: 20px;
  }
  .aboutme-title{
    text-align: center;
    margin-bottom: 20px;
  }
  #introduction-div{
    line-height: 2.0;
    color:#616161
  }
  #welcome-content p{
    margin-bottom: 12px;
  }
  .item-list{
    font-size: 15px;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

  @media screen and (max-width:840px){
    .personal-list{
      margin:0;
      padding:0
    }
    .mdui-list-item{
      padding: 0
    }
    #aboutme-left-div{
      margin-bottom: 50px;
    }
	}
  @media screen and (min-width:1024px){
    #item-div-first{
      margin: 0px 20px 20px 50px;
    }
    #contact-me-blockquote{
      margin-left: 50px;
    }
	}



</style>
