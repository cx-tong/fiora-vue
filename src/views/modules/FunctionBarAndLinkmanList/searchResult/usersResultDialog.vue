<template>
  <div class="usersResultDialog" v-if="showState" @click="showState=false">
    <div class="mainPanel" @click.stop>
      <div class="closeButton" @click="showState=false">
        <i class="iconfont icon-close"/>
      </div>
      <div class="header">
        <img class="avatar"
        :src="userInfo.avatar"
        style="width:60px;height:60px;border-radius:30px;"/>
        <p>{{userInfo.username}}</p>
      </div>
      <div class="info" v-if="isFriend">
        <input style="background-color:#dd514c;"
        class="button" type="button" value="删除好友" @click="deleteFriend" />
      </div>
      <div class="info" v-else>
        <input class="button" type="button" value="加为好友" @click="addFriend" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    userInfo: Object,
  },
  data() {
    return {
      showState: false,
    };
  },
  computed: {
    isFriend: {
      get():boolean {
        return this.$store.state.linkmans[this.userInfo._id];
      },
    },
  },
  methods: {
    show() {
      this.showState = true;
    },
    addFriend() {
      this.$fetch('addFriend', { userId: this.userInfo._id })
        .then(([error, friendInfo]: [string, User]) => {
          if (!error) {
            const friendId:string = this.$utils
              .getFriendId(friendInfo._id, this.$store.state.user._id);
            this.$fetch('getLinkmansLastMessages', { linkmans: [friendId] })
              .then(([e, messages]:[string, Message[]]) => {
                if (!e) {
                  this.$store.commit('addFriend', { friend: friendInfo, message: messages });
                  this.$store.commit('setFocusLinkman', friendId);
                }
              });
            this.showState = false;
          }
        });
    },
    deleteFriend() {
      this.$fetch('deleteFriend', { userId: this.userInfo._id.replace(this.$store.state.user._id, '') })
        .then(([error, friendInfo]: [string, User]) => {
          if (!error) {
            this.$store.commit('deleteLinkman', this.userInfo._id);
            this.showState = false;
          }
        });
    },
  },
});
</script>
<style lang="scss" scoped>
  .usersResultDialog {
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
      top: 20%;
      margin: 10px auto;
      width: 300px;
      max-height: 60vh;
      background-color: #eee;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      .closeButton {
        position: absolute;
        top: 10px;
        color: #666;
        right: 0;
        i {
          font: {
            weight: bold;
            size: 14px;
          }
          margin: 20px;
        }
        :hover {
          color:#333;
          cursor: pointer;
        }
      }
      .header {
        text-align: center;
        padding: 20px;
      }
      .info {
        padding: 20px;
        background-color: white;
        .button {
          font-size: 16px;
          color: white;
          width: 100%;
          height: 34px;
          line-height: 34px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          background-color: rgba(74, 144, 226, 1);
        }
      }
    }
  }
</style>
