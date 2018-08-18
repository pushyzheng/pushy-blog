<template>
  <div id="loading">
    <div id="loading-div">
      <!--<div class="mdui-spinner mdui-spinner-colorful"></div>-->
      <img src="../assets/pic/octo-loader.gif" alt="" id="loading-img">
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",

  }

</script>

<style scoped>

  #loading-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  #loading-img {
    width: 200px;
  }

</style>
