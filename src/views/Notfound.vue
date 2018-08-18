<template>
  <div id="not-found">
    <router-link to="/">
      <img src="../assets/404.jpg" alt="">
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "notfound"
  }
</script>

<style scoped>

  #not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }

</style>
