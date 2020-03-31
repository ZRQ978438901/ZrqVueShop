<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // this.$socket.emit('login',{
    //   username: 'username',
    //   password: 'password'
    // });
  }
}
</script>

<style>
#app{
  background-color: #f0f0f0;
}
</style>
