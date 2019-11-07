<template>
  <div class="loginDialog" @click="closeDialog">
    <div class="mainPanel" @click.stop="">
      <div class="tabPanel">
        <div class="tabPanel-button"
        :class="active == 'login'?'active':''"
        @click="active = 'login'">登录</div>
        <div class="tabPanel-button"
        :class="active == 'register'?'active':''"
        @click="active = 'register'">注册</div>
      </div>
      <div class="inputPanel" v-show="active == 'login'">
        <div class="inputItem">
          <input v-model="loginData.username" name="username" placeholder="请输入用户名"/>
        </div>
        <div class="inputItem">
          <input v-model="loginData.password" name="password" type="password" placeholder="请输入密码"/>
        </div>
        <div class="button">
          <input type="button" value="登录" @click="login"/>
        </div>
      </div>
      <div class="inputPanel" v-show="active == 'register'">
        <div class="inputItem">
          <input v-model="registerData.username" name="username" placeholder="请输入用户名"/>
        </div>
        <div class="inputItem">
          <input v-model="registerData.password"
          name="password"
          type="password"
          placeholder="请输入密码"/>
        </div>
        <div class="button">
          <input type="button" value="注册" @click="register"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      active: 'login',
      loginData: {
        username: '',
        password: '',
      },
      registerData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    closeDialog():void {
      this.$emit('closeDialog');
    },
    login():void {
      this.$socket.emit('login', { username: this.loginData.username, password: this.loginData.password }, (res:object) => {
        console.log(res);
        this.$store.commit('setUserInfo', res);
        this.closeDialog();
      });
    },
    register():void {
      this.$socket.emit('register', { username: this.registerData.username, password: this.registerData.password }, (res:object) => {
        console.log(res);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
  .loginDialog {
    background-color: rgba(55, 55, 55, 0.6);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .mainPanel {
      position: relative;
      overflow: hidden;
      top:20%;
      left: 35%;
      width: 30%;
      max-height: 60vh;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      .tabPanel {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #ccc;
        text-align: center;
        .tabPanel-button {
          width: 40px;
          height: 40px;
          padding: 0 20px;
          margin: 0 15px;
          line-height: 40px;
          cursor: pointer;
        }
       .active {
          color: #108ee9;
          border-bottom: 1px solid #108ee9;
        }
      }
      .inputPanel {
        input {
          height: 45px;
          width: 90%;
          outline:none;
          margin: 0 5%;
          padding: 0 5px;
          margin-top: 30px;
          line-height: 36px;
          border-radius: 5px;
          box-sizing: border-box;
          border: 1px solid #cccccc;
        }
        .button {
          input {
            font-size: 16px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            background-color: rgba(74, 144, 226, 1);
          }
        }
      }
    }
  }
</style>
