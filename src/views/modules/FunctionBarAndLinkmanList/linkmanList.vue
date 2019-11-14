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
  mounted() {
    console.log(this.$store.state.linkmans);
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
