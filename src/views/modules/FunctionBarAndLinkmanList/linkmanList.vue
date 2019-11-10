<template>
  <div class="linkmanList">
    <linkman v-for="item in $store.state.userInfo.groups.concat($store.state.userInfo.friends)"
    :key="item._id"
    :linkmanInfo="item.name?item:setId(item)"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Linkman from './Linkman.vue';

export default Vue.extend({
  components: {
    Linkman,
  },
  methods: {
    covertTime(param:Date) {
      const time = new Date(param);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
    setId(item:any) {
      const linkman = item;
      console.log(item);
      linkman._id = this.$utils.getFriendId(item.to._id ? item.to._id : item.to,
        this.$store.state.userInfo._id);
      return linkman;
    },
  },
});
</script>
<style lang="scss" scoped>
  .linkmanList {
    flex: 1;
    overflow-y: auto;
  }
</style>
