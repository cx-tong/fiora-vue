<template>
  <div class="functionBar">
    <div class="inputContainer"
    :class="inputFocus?'inputFocus':''"
    @click.stop>
      <div class="searchIcon" style="width: 32px; height: 32px;">
        <i class="iconfont icon-search" style="font-size: 22px; line-height: 32px;"></i>
      </div>
      <input class="input"
      v-model="searchKey"
      placeholder="搜索群组/用户"
      @click="showSearchDialog"
      @keyup.enter = "search"
      />
      <div class="iconButton inputIconButton" style="width: 32px; height: 32px;">
        <i class="iconfont icon-clear"
        style="font-size: 18px; line-height: 32px;"
        @click="clearResult"></i>
      </div>
    </div>
    <div
      class="iconButton createGroupButton"
      role="button"
      style="width: 40px; height: 40px; display: block;"
    >
      <i class="iconfont icon-add" style="font-size: 38px; line-height: 40px;"
      @click="showCreateGroupDialog"></i>
    </div>
    <search-panel v-show="inputFocus"
    ref="searchPanel"
    :searchKey = "searchKey"></search-panel>
    <create-group-dialog ref="createGroupDialog"></create-group-dialog>
  </div>
</template>
<script lang="ts">
import Vue, { CreateElement, Component } from 'vue';
import SearchPanel from './SearchPanel.vue';
import CreateGroupDialog from './CreateGroupDialog.vue';

export default Vue.extend({
  components: {
    SearchPanel,
    CreateGroupDialog,
  },
  data() {
    return {
      searchKey: '',
      inputFocus: false,
    };
  },
  methods: {
    clearResult() {
      this.searchKey = '';
      (this.$refs.searchPanel as any).clearResult();
    },
    showSearchDialog() {
      const that = this;
      this.inputFocus = true;
      function closeSearchDialog() {
        that.inputFocus = false;
        that.clearResult();
        document.body.removeEventListener('click', closeSearchDialog);
      }
      document.body.addEventListener('click', closeSearchDialog);
    },
    showCreateGroupDialog() {
      (this.$refs.createGroupDialog as any).show();
    },
    search() {
      (this.$refs.searchPanel as any).search();
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
    .inputContainer {
      position: relative;
      display: flex;
      flex: 1;
      height: 36px;
      border-radius: 18px;
      border: none;
      font-size: 14px;
      color: #333;
    }
    .inputFocus {
      .input {
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
    .iconButton {
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
    .iconButton:hover {
      color: rgba(255, 255, 255, 0.8);
    }
    .searchIcon {
      position: absolute;
      font-size: 22px;
      text-align: center;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 5px;
      color: #666;
    }
    .inputIconButton {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 5px;
      color: #a5b5c0;
    }
    .input {
      padding-left: 35px;
      padding-right: 30px;
      padding-top: 2px;
      border: none;
      border-radius: 18px;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .createGroupButton {
      margin-left: 5px;
    }
  }
</style>
