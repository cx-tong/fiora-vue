<template>
  <div class="linkmanList">
    <div class="linkman"
    :class="item._id === $store.state.linkmanFocusId?'focus':''"
    role="button"
    data-aero="false"
    v-for="item in $store.state.userInfo.groups"
    :key="item._id"
    @click="$store.commit('setFocusLinkman',item._id)">
      <img
        class
        :src="item.avatar"
        alt
        style="width: 48px; height: 48px; border-radius: 24px;"
      />
      <div class="container">
        <div class="rowContainer nameTimeBlock">
          <p class="name">{{item.name}}</p>
          <p class="time">{{item.createTime}}</p>
        </div>
        <div class="rowContainer previewUnreadBlock">
          <p class="preview"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
  mounted() {
    console.log(this.$store.state.userInfo.groups);
  },
});
</script>
<style lang="scss" scoped>
  .linkmanList {
    flex: 1;
    overflow-y: auto;
  }
  .linkman {
      height: 70px;
      display: flex;
      align-items: center;
      padding: 10px 16px;
      cursor: default;
      transition: background-color 0.2s;
  }

  .container {
      flex: 1;
      margin-left: 12px;
  }

  .rowContainer {
      display: flex;
      justify-content: space-between;
  }

  .nameTimeBlock {
      margin-top: 4px;
  }

  .name {
      color: var(--primary-text-color-10);
      font-size: 14px;
  }

  .time {
      color: var(--primary-text-color-7);
      font-size: 12px;
      position: relative;
      top: 4px;
  }

  .previewUnreadBlock {
      margin-top: 6px;
  }

  .preview {
      color: var(--primary-text-color-7);
      font-size: 12px;
      width: 188px;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
  }
  .focus {
    background-color: rgba(74, 144, 226, 0.4);
}
</style>
