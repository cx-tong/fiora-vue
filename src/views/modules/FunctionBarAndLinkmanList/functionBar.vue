<template>
  <div class="functionBar">
    <div>
      <input class="input" v-model="searchKey" type="text" placeholder="搜索群组/用户" />
    </div>
    <div>搜索</div>
    <div class="createGroup" @click="createGroupDialogShow = true">添加群组</div>
    <div class="createGroupDialog"
    @click="createGroupDialogShow = false"
    v-if="createGroupDialogShow">
      <div class="mainPanel" @click.stop="">
        <div class="title">创建群组</div>
        <div class="inputPanel">
            <input v-model="createGroupName" placeholder="请输入群组名"/>
        </div>
        <input type="button" value="创建" @click="createGroup"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      searchKey: '',
      createGroupDialogShow: false,
      createGroupName: '',
    };
  },
  methods: {
    createGroup() {
      this.$socket.emit('createGroup', { name: this.createGroupName }, (res:Object) => {
        console.log(res);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
  .functionBar {
    display: flex;
    height: 70px;
    align-items: center;
    padding: 0 12px;
    position: relative;
    .input {
      padding-left: 35px;
      padding-right: 15px;
      padding-top: 2px;
      border: none;
      border-radius: 18px;
    }
    .createGroup {
      cursor: pointer;
    }
  }
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
      top:20%;
      left: 35%;
      width: 30%;
      max-height: 60vh;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
    }
  }
</style>
