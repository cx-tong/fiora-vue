<template>
  <div class="chatInput">
    <div style="width: 100%" v-if="!$store.state.isLogin">
      您还未登录，请<b class="guestLogin" role="button" @click="showLoginDialog = true">登录</b>后参与聊天
    </div>
    <div class="inputPanel" v-else>
      <button class="iconButton">标签</button>
      <button class="iconButton">随机</button>
      <input class="input"
      v-model="userMessage.content"
      type="text"
      placeholder="随便聊点啥吧, 不要无意义刷屏~~"
      maxlength="2048" />
      <input type="button" value="发送" @click="sendMessage"/>
    </div>
    <login-dialog v-if="showLoginDialog" @closeDialog="showLoginDialog = false"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import loginDialog from './loginDialog.vue';

export default Vue.extend({
  components: {
    loginDialog,
  },
  data() {
    return {
      isLogin: false,
      showLoginDialog: false,
      userMessage: {
        to: '',
        type: '',
        content: '',
      },
    };
  },
  methods: {
    closeDialog() {
      this.showLoginDialog = false;
    },
    sendMessage() {
      const toId = this.$store.state.userInfo.groups[0]._id;
      this.userMessage = {
        to: toId,
        type: 'text',
        content: this.userMessage.content,
      };
      this.$socket.emit('sendMessage', this.userMessage, (res:Object) => {
        console.log(res);
        this.$emit('updateMessageList', res);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
  .chatInput {
    background-color: rgba(255, 255, 255, 0.5);
    height: 70px;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    border-bottom-right-radius: 10px;
    .guestLogin {
      color: rgb(74, 144, 226, 0.8);
      cursor: pointer;
    }
    .inputPanel {
      display: flex;
      .iconButton {
        text-align: center;
        color: #a5b5c0;
        cursor: pointer;
      }
      .input {
        flex: 1;
        padding: 0px 8px;
        height: 32px;
        line-height: 32px;
        outline: none;
        border: 1px solid rgba(208, 208, 208, 0.5);
        font-size: 14px;
        color: #666;
        user-select: auto;
      }
    }
  }
</style>
