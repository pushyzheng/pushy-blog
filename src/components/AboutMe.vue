<template>
    <div id="about-me">
      <div class="mdui-container" id="post-container" >
        <div class="mdui-card" style="padding:20px 0">
          <div id="card-content">
            <div class="mdui-row">
              <div class="mdui-col-md-3">
                <div class="mdui-card-media" id="aboutme-left-div">
                  <div id="my_gravatar" class="mdui-center">
                    <img src="../assets/my_gravatar.jpg" class="mdui-img-fluid mdui-img-circle">
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
                    <div class="mdui-divider"></div>
                    <div style="text-align:center;margin-bottom:20px;margin-top:30px;color:#ABAAAA;">
                      个人项目和代码库
                    </div>
                    <div class="mdui-center">
                      <div class="mdui-chip mdui-center" style="margin-bottom:20px;"
                            onclick="window.open('https://github.com/PushyZqin')">
                        <span class="mdui-chip-icon mdui-color-blue"> <i class="mdui-icon material-icons">link</i></span>
                        <span class="mdui-chip-title">GitHub</span>
                      </div>
                      <div class="mdui-chip mdui-center" style="margin-bottom:20px;"
                            onclick="window.open('#')">
                        <span class="mdui-chip-icon mdui-color-blue"> <i class="mdui-icon material-icons">link</i></span>
                        <span class="mdui-chip-title" style="text-align:center">博客</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mdui-col-md-9">
                <div class="mdui-card-media" id="aboutme-right-div">
                  <div class="mdui-card" style="margin:10px;">
                    <div class="mdui-card-media">
                      <img src="https://llp0574.github.io//img/js.png"/>
                      <div class="mdui-card-media-covered">
                        <div class="mdui-card-primary">
                          <div class="mdui-card-primary-title">Title</div>
                          <div class="mdui-card-primary-subtitle">Subtitle</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <transition-group name="list" tag="p"> -->
                    <!-- <div v-if="showMsg" key="item"> -->
                    <div key="item">
                      <div class="aboutme-title"><h2>个人介绍</h2></div>
                      <div style="margin:0 30px;padding:10px;">
                        <ul class="mdui-list mdui-list-dense">
                          <li class="mdui-list-item mdui-ripple item-list">网名：Pushy、PushyZqin &nbsp;来自英文一词Pushy，译为有进取心的（诚然有固执己见、一意孤行之意...）</li>
                          <li class="mdui-list-item mdui-ripple item-list">年龄：98年生，今19</li>
                          <li class="mdui-list-item mdui-ripple item-list">学历：本科大二在读，坐标河北某高校</li>
                          <li class="mdui-list-item mdui-ripple item-list">专业：非科班，但热爱编程</li>
                        </ul>
                      </div>
                      <div class="aboutme-title"><h2>我的技能</h2></div>
                      <div style="margin:0 30px;padding:10px;">
                        <ul class="mdui-list mdui-list-dense">
                          <li class="mdui-list-item mdui-ripple item-list">Python，及基于Python编写的Web应用框架诸如Flask、Django等</li>
                          <li class="mdui-list-item mdui-ripple item-list">了解基本的SQL知识，及ORM框架</li>
                          <li class="mdui-list-item mdui-ripple item-list">渐进式的JavaScript框架Vue，Bootstrap、MDUI、Elements等UI框架</li>
                        </ul>
                      </div>
                      <div class="aboutme-title"><h2>联系我</h2></div>
                      <div style="margin:0 30px;padding:10px;">
                        <ul class="mdui-list mdui-list-dense">
                          <li class="mdui-list-item mdui-ripple item-list">QQ：
                            <a href="http://120.78.165.238:4000/static/img/qq_qrcode.3181d65.jpg" style="color:rgb(26, 188, 156)" target="_blank">1437876073</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- <div v-else> -->
                    <div>
                      <br><br><br><br><br><br><br><br><br>
                    </div>
                  <!-- </transition-group> -->
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
        axios.get('http://120.78.165.238:4000/api/blog/like').then(response=>{
          self.likeCount = response.data.data.like
        })
      },
      scrollListItem:function(){
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.scroll > 250) {
          this.showMsg = true
        }
      }
    },
    created:function(){
      this.getLikeCount()
    },
    mounted:function(){
      window.addEventListener('scroll', this.scrollListItem)
    }
  }
</script>

<style scoped>

  li{
    margin-bottom: 10px;
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

</style>
