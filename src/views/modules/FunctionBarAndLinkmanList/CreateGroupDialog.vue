<template>
  <div
    class="createGroupDialog"
    @click="showState = false"
    v-if="showState"
  >
    <div class="mainPanel" @click.stop>
      <div class="title">
        <span>创建群组</span>
        <i class="iconfont icon-close" style="cursor: pointer;" @click="showState = false"></i>
      </div>
      <div class="body">
        <p class="text">请输入群组名</p>
        <input class="input" v-model="groupName" placeholder="请输入群组名" />
        <input class="button" type="button" value="创建" @click="createGroup" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showState: false,
      groupName: '',
    };
  },
  methods: {
    showDialog() {
      this.showState = true;
    },
    createGroup() {
      this.$socket.emit(
        'createGroup',
        { name: this.groupName },
        (groupInfo:Group) => {
          this.$store.commit('addGroupInfo', groupInfo);
          this.$store.commit('addMessagesList', { id: groupInfo._id, message: [] });
          this.showState = false;
        },
      );
    },
  },
});
</script>
<style lang="scss" scoped>
  .createGroupDialog {
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
      top: 30%;
      width: 400px;
      padding: 10px 0;
      margin: auto;
      background-color: white;
      border-radius: 10px;
      .title {
        display: flex;
        padding: 0 20px;
        justify-content: space-between;
        border-bottom: #ccc solid 1px;
        * {
          font-size: 18px;
          font-weight: bold;
          line-height: 50px;
        }
      }
      .body {
        padding: 20px;
        .text {
          font-size: 14px;
          font-weight: normal;
          line-height: 31px;
          color: #333;
        }
        .input {
          height: 40px;
          width: 100%;
          outline:none;
          margin: 10px 0;
          padding: 0 5px;
          line-height: 36px;
          border-radius: 5px;
          box-sizing: border-box;
          border: 1px solid #cccccc;
        }
        .button {
          position: relative;
          font-size: 16px;
          color: white;
          width: 4em;
          float: right;
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
