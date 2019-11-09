<template>
  <div class="chatInput">
    <div style="width: 100%" v-if="!$store.state.isLogin">
      您还未登录，请<b class="guestLogin" role="button" @click="showLoginDialog = true">登录</b>后参与聊天
    </div>
    <div class="inputPanel" v-else>
      <div class="iconButton">
        <i class="iconfont icon-expression" style="font-size: 32px;
        line-height: 44px;" @click="sendMessage"></i>
      </div>
      <div class="iconButton">
        <i class="iconfont icon-feature" style="font-size: 32px;
        line-height: 44px;" @click="sendMessage"></i>
      </div>
      <div class="from">
        <input class="input"
        v-model="content"
        type="text"
        placeholder="随便聊点啥吧, 不要无意义刷屏~~"
        maxlength="2048" />
        <i class="iconfont icon-about tooltip"></i>
      </div>
      <div class="iconButton">
        <i class="iconfont icon-send" style="font-size: 32px;
        line-height: 44px;" @click="sendMessage"></i>
      </div>
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
      content: '',
    };
  },
  methods: {
    closeDialog() {
      this.showLoginDialog = false;
    },
    sendMessage() {
      this.$socket.emit('sendMessage', { to: this.$store.state.linkmanFocusId, type: 'text', content: this.content }, (res:Object) => {
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
      flex: 1;
      text-align: center;
      align-items: center;
      .iconButton {
        width: 44px;
        height: 44px;
        text-align: center;
        color: #AAA;
        cursor: pointer;
      }
      .iconButton:hover {
        color: rgb(74, 144, 226, 0.8);
      }
      .from {
        flex: 1;
        display: flex;
        position: relative;
        margin: 0 10px;
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
        .tooltip {
          position: absolute;
          right: 10px;
          top: 5px;
          font-size: 22px;
          color: #aaa;
        }
      }
    }
  }
</style>
