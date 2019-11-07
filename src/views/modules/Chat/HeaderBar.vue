<template>
  <div class="headerBar">
    <span>{{groupInfo}}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    groupInfo: String,
  },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
  .headerBar {
    height: 70px;
    border-bottom: 1px solid rgba(208, 208, 208, 0.6);
    display: flex;
    align-items: center;
    padding: 0px 18px;
    justify-content: space-between;
    position: relative;
    border-top-right-radius: 10px;
  }
</style>
