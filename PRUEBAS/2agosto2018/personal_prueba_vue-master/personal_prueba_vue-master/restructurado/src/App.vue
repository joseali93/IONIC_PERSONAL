<template>
  <div id="app">


            <router-view ></router-view>
  </div>
</template>

<script>
import Preload from './componentes/preload.vue'

export default {
      components: {
        Preload
    },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style></style>
