<template>
  <div class="linkmanList">
    <linkman v-for="item in $store.state.userInfo.groups"
    :key="item._id"
    :groupInfo="item"
    :preview="$store.state.messagesList[item._id].length!==0?
    $store.state.messagesList[item._id][$store.state.messagesList[item._id].length-1]
    :{}"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Linkman from './Linkman.vue';

export default Vue.extend({
  components: {
    Linkman,
  },
  data() {
    return {
      preview: {},
    };
  },
  mounted() {
    console.log(this.$store.state.userInfo.groups);
  },
  methods: {
    covertTime(param:Date) {
      const time = new Date(param);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
  },
  sockets: {
    message(res:Message) {
      // this.preview[res._id] = res
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
