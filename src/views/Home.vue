<template>
  <div class="home">
    <div class="mainPanelMask" />
    <div class="mainPanel">
      <sidebar />
      <function-bar-and-linkman-list />
      <chat />
    </div>
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

export default Vue.extend({
  name: 'home',
  components: {
    Sidebar,
    FunctionBarAndLinkmanList,
    Chat,
  },
  created() {
    if (window.localStorage.getItem('token')) {
      this.$fetch('loginByToken', { token: window.localStorage.getItem('token') })
        .then(([error, userInfo]: [string, User]) => {
          if (!error) {
            const { groups, friends } = userInfo;
            const linkmanIds = [
              ...(groups as Group[]).map((group:Group) => group._id),
              ...(friends as Friend[]).map((friend:Friend) => this.$utils
                .getFriendId((friend.to as User)._id, userInfo._id)),
            ];
            this.$fetch('getLinkmansLastMessages', { linkmans: linkmanIds })
              .then(([e, resData]: [string, MessagesMap]) => {
                if (!e) {
                  this.$store.commit('setLinkmans', { groups: userInfo.groups, friends: userInfo.friends, messagesMap: resData });
                  this.$store.commit('login', userInfo);
                }
              });
          }
        });
    } else {
      this.$fetch('guest').then(([error, guestInfo]: [string, Linkman]) => {
        if (!error) {
          this.$store.commit('setGuest', { guest: guestInfo, messages: guestInfo.messages });
        }
      });
    }
  },
  sockets: {
    message(message: Message) {
      (this.$refs.tipAudio as HTMLAudioElement).src = `./audios/${this.$store.state.status.sound}`;
      (this.$refs.tipAudio as HTMLAudioElement).play();
      if (!(this.$store.state.linkmans as LinkmansMap)[message.to]) {
        this.$fetch('addFriend', { userId: message.from._id })
          .then(([error, friendInfo]: [string, User]) => {});
      }
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
