<template>
  <div class="sidebar">
    <div class="buttons">
      <!-- <img :src="" -->
      <button>上</button>
      <button>下</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      test: 'test',
    };
  },
});
</script>
<style lang="scss" scoped>
  .sidebar {
    width: 80px;
    position: relative;
    background-color: rgb(74, 144, 226, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .buttons {
      position: absolute;
      bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
