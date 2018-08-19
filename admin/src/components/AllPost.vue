<template>
  <div id="all-post">
    <div id="loading" v-if="showLoading">
      <h3>加载中</h3>
    </div>
    <div id="content" v-else>
      <table class="mdui-table mdui-container">
        <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>发布时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(post,index) in postList">
          <td>{{ post.post_id }}</td>
          <td>
            <a href="javascript:void(0)" @click="redirectPost(post.post_id)" style="color: black">{{ post.title }}</a>
          </td>
          <td>{{ post.create_time }}</td>
          <td>
            <button class="mdui-btn mdui-color-deep-purple mdui-ripple" @click="edit(post)"
                    mdui-dialog="{target: '#edit-dialog'}">
              编辑
            </button>
            <button class="mdui-btn mdui-color-red mdui-ripple" @click="remove(post)"
                    mdui-dialog="{target: '#delete-dialog'}">
              删除
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--编辑模态框-->
    <div class="mdui-dialog" id="edit-dialog">
      <div class="mdui-dialog-title" style="font-weight: bolder">编辑 {{ editPost.title }}</div>
      <div class="mdui-dialog-content" style="padding: 0px">
        <!--编辑表单-->
        <div style="display: flex;justify-content: center">
          <input class="mdui-textfield-input" type="text" placeholder="请填写修改的标题" id="edit-form-input"
                 v-model="editPost.title" />
        </div>
        <mavon-editor v-model="editPost.body" style="margin-bottom: 500px;" />
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" @click="submitUpdate">确定修改</button>
      </div>
    </div>
    <!--删除确认模态框-->
    <div class="mdui-dialog" id="delete-dialog">
      <div class="mdui-dialog-content">您确定要删除 <b>{{ deletePost.title }}</b> 这份文章吗？删除后将无法恢复内容！</div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
        <button class="mdui-btn mdui-ripple" @click="submitDelete">确定</button>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import urls from '../config/urls'

  export default {
    name: "all-post",
    data (){
      return {
        showLoading: true,
        postList: [],
        editPost: {},
        deletePost: {},
        editTitle: '',
        editContent: '',
      };
    },
    computed:{
      allPartPostsArray:function(){
        return this.$store.state.allPartPostsArray
      }
    },
    methods:{
      redirectPost:function(post_id){
        window.open('https://pushy.site/posts/' + post_id)
      },
      edit(post) {
        this.editPost = post;
      },
      remove(post) {
        this.deletePost = post
      },
      getPostList() {
        let self = this;
        axios.get(urls.post.postList).then(
          response => {
            self.postList = response.data.data;
            self.showLoading = false;
          }
        )
      },
      submitDelete() {
        let inst = new mdui.Dialog('#delete-dialog');
        axios.delete(urls.post.delete(this.deletePost.post_id)).then(response => {
          mdui.snackbar({message: '删除成功'});
          this.getPostList();
          inst.toggle();
        }).catch(error => {
          mdui.snackbar({message: '删除失败'});
          inst.toggle();
        })
      },
      submitUpdate() {
        let dialog = new mdui.Dialog('#edit-dialog');
        axios.put(urls.post.update, this.editPost).then(response => {
          dialog.toggle();
          mdui.snackbar({message: '更新成功'});
        }).catch(toggle => {
          dialog.open();
          mdui.snackbar({message: '更新失败'});
        })
      },
    },
    created() {
      this.getPostList();
      // this.$store.dispatch('fetchPartPostAn');
    }
  }

</script>


<style scoped>

  #all-post {
    margin-bottom: 50px;
  }

  #edit-dialog{
    max-width: 1400px;
    max-height: 90%
  }

  #edit-form-input {
    width: 800px;
    margin: 20px 0;
    cursor: text;
    font-size: 28px;
    font-weight: bold;
  }

  #loading{
    text-align: center;
  }

</style>
