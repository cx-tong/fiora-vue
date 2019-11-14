<template>
  <div class="home">
    <div class="tip"></div>
    <div class="mainPanelMask" />
    <div class="mainPanel">
      <sidebar />
      <function-bar-and-linkman-list />
      <chat />
    </div>
  <!-- <login-and-register /> -->
  <audio ref="tipAudio">
    <source type="audio/mp3" :src="`./audios/${$store.state.status.sound}`" />
  </audio>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';
import Sidebar from './modules/Sidebar/Sidebar.vue';
import FunctionBarAndLinkmanList from './modules/FunctionBarAndLinkmanList/FunctionBarAndLinkmanList.vue';
import Chat from './modules/Chat/Chat.vue';

  interface MessageList {
    messages: [],
  }
export default Vue.extend({
  name: 'home',
  components: {
    Sidebar,
    FunctionBarAndLinkmanList,
    Chat,
    // LoginAndRegister,
  },
  created() {
    Vue.prototype.tipAudio = this.$refs.tipAudio;
    this.$fetch('guest').then(([error, guestInfo]: [string, any]) => {
      if (!error) {
        this.$store.commit('setGuest', { guest: guestInfo, messages: guestInfo.messages });
      }
    });
  },
  sockets: {
    message() {
      (this.$refs.tipAudio as any).play();
    },
  },
});
</script>
<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 625px;
    background-image: url('../assets/images/background.jpg');
  }
  .mainPanel {
    position: absolute;
    width: 70%;
    height: 90%;
    left: 15%;
    top: 5%;
    display: flex;
    border-radius: 10px;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
  }
  .mainPanelMask {
    position: absolute;
    background-position: -204.9px -18.6px;
    background-image: url('../assets/images/background.jpg');
    background-size: 1920px 1080px;
    background-repeat: no-repeat;
    filter: blur(10px);
    width: 70%;
    height: 90%;
    left: 15%;
    top: 5%;
  }
</style>
