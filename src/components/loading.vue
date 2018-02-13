<template>

  <div id="loading">
    <div id="loading-div">
      <div class="mdui-spinner mdui-spinner-colorful"></div>
      <!-- <img src="http://static.pushy.site/pic/loading.gif" alt=""> -->
      <div id="loading-text">
        loading...
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
		font-size: 16px;
		color: #616161;
		font-weight:bolder;
		margin-top: 10px;
	}
</style>
