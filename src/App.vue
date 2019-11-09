<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    // HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  div, p, span {
    color: #333;
  }
</style>
