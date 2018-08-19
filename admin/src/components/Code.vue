<template>

  <div id="code">
    <div class="mdui-container" style="background-color: white;padding: 20px;">
      <div>
        <h2>提交一份代码片段</h2>
        <form method="post" action="https://api.pushy.site/code/create">
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">Email</label>
            <input class="mdui-textfield-input" type="text" name="title">
          </div>
          <div class="mdui-textfield">
            <textarea class="mdui-textfield-input" rows="20" placeholder="Message" name="content"></textarea>
          </div>
          <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-a200" type="submit">
            提交代码片段
          </button>
        </form>
      </div>

    </div>
  </div>

</template>

<script>

  export default {
    name: "code",
  }

</script>


<style scoped>

</style>
