<template>
  <div>
    <div style="display: flex;justify-content: center;margin-bottom: 20px;">
      <button class="mdui-btn mdui-color-pink-a200 mdui-ripple" mdui-dialog="{target: '#dialog'}">
        增加新的标签
      </button>
    </div>
    <table class="mdui-table mdui-container">
      <thead>
      <tr>
        <th>ID</th>
        <th>标签名</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tag in tagArray">
        <td>{{ tag.id }}</td>
        <td>{{ tag.name }}</td>
      </tr>
      </tbody>
    </table>
    <!--增加标签对话框-->
    <div class="mdui-dialog" id="dialog">
      <div class="mdui-dialog-title">增加新的标签</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">标签名</label>
          <input class="mdui-textfield-input" type="text" v-model="name" />
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-cancel>取消</button>
        <button class="mdui-btn mdui-ripple" @click="saveTag">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import urls from '../config/urls'
import mdui from 'mdui'
import axios from 'axios'

export default {
  name: "Tag",
  data() {
    return {
      tagArray: [],
      name: null
    }
  },
  methods: {
    getTags() {
      let self = this;
      axios.get(urls.tag.tagList).then(
        response => {
          self.tagArray = response.data.data;
        }
      )
    },
    saveTag() {
      let inst = new mdui.Dialog('#dialog');
      let form = {
        'name': this.name
      };
      axios.post(urls.tag.addTag, form).then(
        response => {
          mdui.snackbar({
            message: '添加成功'
          });
          this.getTags();
          inst.toggle();
        }
      ).catch(
         error => {
           mdui.snackbar({
             message: '添加失败'
           });
           inst.toggle();
         }
      )
    }
  },
  created() {
    this.getTags();
  }
}
</script>

<style scoped>

</style>
