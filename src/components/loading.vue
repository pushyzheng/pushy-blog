<template>

  <div id="loading">
    <div id="loading-div">
      <div class="mdui-spinner mdui-spinner-colorful"></div>
      <div id="loading-text">
        加载中,请稍后...
        <!-- 是我胖虎服务器宕机了 还是小夫你网差了 -->
      </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
  

  export default {
    name: "loading",

  }

</script>


<style scoped>
	#loading-div{
		text-align: center;
    margin-bottom: 100px;
    margin-top: 100px;
	}
	#loading-text{
		font-size: 20px;
		color: #616161;
		font-weight:bolder;
		margin-top: 10px;
	}
</style>
