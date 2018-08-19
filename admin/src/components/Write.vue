<template>
  <div id="write">
    <div id="admin-write-body" v-if="showWriteBody" class="mdui-container">
        <div>
          <!-- 标题输入框 -->
          <div style="display: flex;justify-content: center">
            <textarea class="mdui-textfield-input" placeholder="请输入标题"
                      id="title-input" v-model="form.title"/>
          </div>
          <mavon-editor v-model="form.content" v-show="showEditor" />
          <div id="post-info">
            <!--文件上传表单-->
            <div id="upload-form">
              <el-upload
                class="upload-demo"
                drag
                action="https://file.pushy.site/api/uploads"
                :on-success="uploadSuccess"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
            <!-- 标签选择框 -->
            <div style="flex-grow: 1;">
              <div style="display: flex;flex-direction: column">
                <el-select v-model="form.catagory" multiple placeholder="请选择"
                           style="margin-right: 20px;margin-bottom: 100px">
                  <el-option
                    v-for="tag in tagArray"
                    :key="tag.name"
                    :label="tag.name"
                    :value="tag.name">
                  </el-option>
                </el-select>
                <button class="mdui-btn mdui-color-pink-a200 mdui-ripple mdui-center mdui-btn-raised"
                        @click="publishPost" v-bind:disabled="showBtnDisabled">
                  发布
                </button>
              </div>
            </div>
          </div>
          <!-- 页脚发布部分 -->
          <div class="mdui-center">

          </div>
        </div>
    </div>
    <!-- 发表完成显示的内容： -->
    <div v-else id="write-done-div">
      <div class="mdui-container">
        <div id="done-messsage">
            <h1 id="done-post-title" @click="readOriginal">{{title}}</h1>
            发表成功！
        </div>
        <div class="mdui-row-xs-2">
          <div class="mdui-col">
            <button class="mdui-btn mdui-btn-block mdui-color-blue-800 mdui-ripple" style="font-size:18px;"
                    @click="readOriginal">
              <i class="mdui-icon material-icons">link</i>&nbsp;&nbsp;阅读原文
            </button >
          </div>
          <div class="mdui-col">
            <button class="mdui-btn mdui-btn-block mdui-color-pink-a200 mdui-ripple" style="font-size:18px;"
                    @click="reWrite">
              <i class="mdui-icon material-icons">mode_edit</i>&nbsp;&nbsp;再写一篇
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mdui from 'mdui'
  import axios from 'axios'
  import urls from '../config/urls'

  export default {
    name: "write",
    data() {
      return {
        tagArray: [],
        form: {
          title: '',
          content: '',
          catagory: [],
          url: '' // 封面图的URL
        },
        file:'',
        post_id:'',
        showEditor: false,
        showWriteBody:true,
        showBtnDisabled:false
      }
    },
    methods:{
      publishPost:function(event){
        if (this.form.title.length === '' || this.form.content === '') {
          mdui.snackbar({
            message: '请输入完整的标题内容'
          });
        }
        if (this.form.catagory.length === 0) {
          mdui.snackbar({
            message: '请选择合适的标签'
          });
        }
        let self = this;
        self.showBtnDisabled = true;
        axios.post(urls.post.add, this.form).then(response => {
          if (response.data.error_code === 0) {
            self.showWriteBody = false;
            self.post_id = response.data.data.post_id;
            self.showBtnDisabled = false
          } else {
            mdui.snackbar({
              message: '请输入完整的表单信息'
            });
          }
        }).catch(error => {
          console.log(error.data)
        });
      },
      // 上传成功的回调函数
      uploadSuccess(response, file, fileList) {
        this.form.url = response.data[0].addr;
      },
      getTags() {
        let self = this;
        axios.get(urls.tag.tagList).then(
          response => {
            self.tagArray = response.data.data;
          }
        )
      },
      reWrite() {
        this.showWriteBody = true;
        this.title = '';
        this.content = '';
        this.catagory = []
      },
      readOriginal() {
        window.open('https://pushy.site/posts/' + this.post_id)
      },
      submitUpload() {
        this.$refs.upload.submit();
      }
    },
    created() {
      this.getTags();
    },
    mounted() {
      this.showEditor = true;
    }
  }

</script>


<style scoped>

  .mdui-container {
    padding: 0
  }

  #admin-write-body {
    background: white;
  }

  #title-input{
    font-size: 28px;
    font-weight: bolder;
    cursor: text;
    width: 800px;
    margin: 20px 0;
  }

  #post-info {
    display: flex;
    margin: 20px 0;
  }

  #upload-form  {
    flex-grow: 1;
    display:flex;
    justify-content: center
  }

  label{
    margin-right: 15px;
  }

  #write-done-div{
    text-align: center;
    margin-top: 200px;
  }

  #done-messsage{
    margin-bottom: 50px;
  }

  #done-post-title:hover{
    cursor: pointer
  }

</style>
