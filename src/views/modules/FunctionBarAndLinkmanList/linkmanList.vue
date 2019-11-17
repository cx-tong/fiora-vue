<template>
  <div class="linkmanList">
    <linkman v-for="(value, key) in $store.state.linkmans"
    :key="key"
    :linkman="value"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Linkman from './Linkman.vue';

export default Vue.extend({
  components: {
    Linkman,
  },
});
</script>
<style lang="scss" scoped>
  .linkmanList {
    flex: 1;
    overflow-y: auto;
  }
</style>
