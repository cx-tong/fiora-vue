<template>
  <div class="userInfoDialog" @click="showStatus = false" v-if="showStatus">
    <div class="mainPanel" @click.stop>
      <div class="header">
        个人信息设置
      </div>
      <div class="body">
        <p class="title">修改密码</p>
        <input class="input" type="password" v-model="oldPassword" placeholder="请输入旧密码"/>
        <input class="input" type="password" v-model="newPassword" placeholder="请输入新密码"/>
        <button class="button" @click="changePassword">确认修改</button>
        <p class="title">修改用户名</p>
        <input class="input" v-model="username" placeholder="请输入用户名"/>
        <button class="button" @click="changeUsername">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showStatus: false,
      username: '',
      oldPassword: '',
      newPassword: '',
    };
  },
  methods: {
    show() {
      this.showStatus = true;
    },
    changeUsername() {
      this.$fetch('changeUsername', { username: this.username })
        .then(([error, resData]: [string, Object]) => {
          if (!error) {
            this.$message({ content: '用户名修改成功，请重新登录！' });
            this.$socket.close();
            this.$store.commit('logout');
            this.$socket.open();
            this.showStatus = false;
          }
        });
    },
    changePassword() {
      this.$fetch('changePassword', { oldPassword: this.oldPassword, newPassword: this.newPassword })
        .then(([error, resData]: [string, Object]) => {
          if (!error) {
            this.$message({ content: '密码修改成功，请重新登录！' });
            this.$socket.close();
            this.$store.commit('logout');
            this.$socket.open();
            this.showStatus = false;
            this.username = '';
            this.oldPassword = '';
            this.newPassword = '';
          }
        });
    },
  },
});
</script>
<style lang="scss" scoped>
  .userInfoDialog {
    background-color: rgba(55, 55, 55, 0.6);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    .mainPanel {
      position: relative;
      overflow: hidden;
      top:20%;
      left: 35%;
      width: 30%;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      .header {
        border-bottom: 1px solid #e9e9e9;
      }
      .body {
        overflow-y: auto;
        max-height: 60vh;
        .title {
          line-height: 33px;
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }
        .input {
          width: 85%;
          height: 36px;
          margin: 3px 0;
          line-height: 36px;
          border-radius: 6px;
          padding: 0 34px 0 8px;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .button {
          width: 100px;
          height: 36px;
          border: none;
          background-color: rgba(74, 144, 226, 0.85);
          color: rgba(247, 247, 247, 1);
          border-radius: 4px;
          font-size: 14px;
          transition: background-color 0.4s;
        }
      }
    }
  }
</style>
