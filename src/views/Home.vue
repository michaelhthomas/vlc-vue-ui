<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Playlist msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Playlist from '@/components/Playlist.vue'

export default {
  name: 'Home',
  components: {
    Playlist
  }
}
</script>
