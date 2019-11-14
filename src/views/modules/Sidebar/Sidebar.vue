<template>
  <div class="sidebar">
    <img class="avatar" :src="$store.state.user.avatar" v-if="$store.getters.isLogin"/>
    <div class="buttons">
      <div class="iconButton" @click="$refs.settingDialog.show()" v-if="$store.getters.isLogin">
        <i class="iconfont icon-setting" style="font-size: 26px;line-height: 40px;"></i>
      </div>
      <div class="iconButton" @click="logout" v-if="$store.getters.isLogin">
        <i class="iconfont icon-logout" style="font-size: 26px;line-height: 40px;"></i>
      </div>
    </div>
    <setting-dialog ref="settingDialog"></setting-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import SettingDialog from './settingDialog.vue';

export default Vue.extend({
  components: {
    SettingDialog,
  },
  methods: {
    logout() {
      this.$socket.close();
      this.$store.commit('logout');
      this.$socket.open();
    },
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
      .iconButton {
        width: 40px;
        height: 40px;
        text-align: center;
       color: rgba(247, 247, 247, 0.7);
        cursor: pointer;
      }
    }
  }
</style>
