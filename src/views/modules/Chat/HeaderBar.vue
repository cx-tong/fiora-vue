<template>
  <div class="headerBar">
    <span>{{linkman?linkman.name:''}}</span>
    <div class="iconButton" @click="showSidePanel" v-if="$store.getters.isLogin" @click.stop>
      <i class="iconfont icon-gongneng"
      style="font-size: 24px;line-height: 40px;color:rgba(74,144,226,1)"></i>
    </div>
    <user-result ref="userResultDialog" :userInfo="linkman"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import UserResult from '../FunctionBarAndLinkmanList/searchResult/usersResultDialog.vue';

export default Vue.extend({
  components: {
    UserResult,
  },
  props: {
    linkman: Object,
  },
  methods: {
    showSidePanel() {
      if (this.linkman.type === 'group') {
        this.$emit('showSidePanel');
      } else {
        console.log(this.linkman);
        (this.$refs.userResultDialog as any).show();
      }
    },
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
    .iconButton {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
