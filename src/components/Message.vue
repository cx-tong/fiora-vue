<template>
  <div class="tip">
    <div class="text" v-if="showStatus">
      <i class="iconfont"
      :class="type==='error'?'icon-warning':'icon-success'"
      :style="type==='error'?'color: #dd514c;':'color: green'"></i>
      {{content}}
    </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showStatus: false,
      content: '',
      type: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.showStatus = false;
    }, 2000);
  },
});
</script>
<style lang="scss" scoped>
  .tip {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    .text {
      z-index: 9999;
      position: absolute;
      display: flex;
      align-items: center;
      // left: 0;
      // right: 0;
      // margin: 0 auto;
      top: 10%;
      border-radius: 10px;
      padding: 5px 20px;
      background-color: white;
    }
  }
</style>
