<template>
  <div class="sidePanel" v-if="isShow" @click.stop>
    <div class="header">
      <label>群组功能</label>
    </div>
    <div class="body">
      <label>修改群名称</label>
      <input class="input" v-model="groupName" placeholder="请输入群名称" />
      <button class="button" @click="changeGroupName">确认</button>
      <button class="button"
        @click="linkman.creator===$store.state.user._id?deleteGroup():leaveGroup()">
        {{linkman.creator === $store.state.user._id ? '解散群组' : '退出群组'}}</button>
      <div class="onlineMember">
        <div class="userList">
          在线成员: {{onlineMember.length}}
          <div class="user" v-for="item in onlineMember" :key="item._id"
            @click="selectUserInfo=item.user;$refs.userResult.show()">
            <img :src="item.user.avatar" style="width:24px;height:24px;border-radius:12px;"/>
            <div class="name">{{item.user.username}}</div>
          </div>
        </div>
      </div>
    </div>
    <user-result ref="userResult" :userInfo="selectUserInfo"/>
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
  data() {
    return {
      isShow: false,
      onlineMember: [],
      selectUserInfo: {},
      groupName: '',
    };
  },
  methods: {
    show() {
      this.isShow = true;
      const that = this;
      this.$fetch('getGroupOnlineMembers', { groupId: this.linkman._id })
        .then(([error, userList]: [string, User[]]) => {
          if (!error) {
            (this.onlineMember as User[]) = userList;
          }
        });
      function closeSearchDialog() {
        that.isShow = false;
        document.body.removeEventListener('click', closeSearchDialog);
      }
      document.body.addEventListener('click', closeSearchDialog);
    },
    changeGroupName() {
      this.$fetch('changeGroupName', { groupId: this.linkman._id, name: this.groupName })
        .then(([error, resData]: [string, Object]) => {
          this.$store.commit('changeGroupName', { id: this.linkman._id, name: this.groupName });
          this.$message({ content: '修改成功！' });
        });
    },
    leaveGroup() {
      this.$fetch('leaveGroup', { groupId: this.linkman._id })
        .then(([error, resData]:[string, null]) => {
          if (!error) {
            this.$store.commit('deleteLinkman', this.linkman._id);
            this.isShow = false;
          }
        });
    },
    deleteGroup() {
      this.$fetch('deleteGroup', { groupId: this.linkman._id })
        .then(([error, resData]:[string, null]) => {
          if (!error) {
            this.$store.commit('deleteLinkman', this.linkman._id);
            this.isShow = false;
          }
        });
    },
  },
});
</script>
<style lang="scss" scoped>
  .sidePanel {
    position: absolute;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: rgba($color: #fff, $alpha: 0.9);
    transition: transform 0.5s;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60px;
    }
    .body {
      overflow-y:auto;
      .input {
        height: 36px;
        line-height: 36px;
        border-radius: 10px;
      }
      .button {
        border: 0;
        border-radius: 6px;
        width: 60px;
        height: 36px;
        line-height: 36px;
        color: #fff;
        background-color: #dd514c;
      }
      .userList {
        .user {
          display: flex;
          cursor: pointer;
          .name {
            margin-left: 10px;
            line-height: 28px;
          }
        }
      }
    }
  }
</style>
