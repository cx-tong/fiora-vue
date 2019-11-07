<template>
  <div class="functionBarAndLinkmanList">
    <function-bar />
    <linkman-list></linkman-list>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import FunctionBar from './functionBar.vue';
import LinkmanList from './linkmanList.vue';

export default Vue.extend({
  components: {
    FunctionBar,
    LinkmanList,
  },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
  .functionBarAndLinkmanList {
    width: 300px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgba(74, 144, 226, 0.5);
  }
</style>
