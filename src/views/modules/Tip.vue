<template>
  <div class="tip">
    <div class="text" v-if="show">
      <i class="iconfont icon-warning" style="color: #dd514c;"></i>
      {{tipText}}
    </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    tipText: String,
  },
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
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
