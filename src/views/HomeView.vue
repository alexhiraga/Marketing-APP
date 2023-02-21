<template>
  <div class="home">
    <HelloWorld msg="Dashboard"
    class="pt-5"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
    div div.home {
        background-image: url('../assets/wallpaper-supra.jpg');
        height: 100vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0!important;
    }
</style>
