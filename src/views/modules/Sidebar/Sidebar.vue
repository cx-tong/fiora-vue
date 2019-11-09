<template>
  <div class="sidebar">
    <div class="buttons">
      <img class="avatar" :src="$store.state.userInfo.avatar" />
      <button>设置</button>
      <button>注销</button>
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
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin-top: 50px;
      cursor: pointer;
    }
    .buttons {
      position: absolute;
      bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
