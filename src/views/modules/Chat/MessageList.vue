<template>
  <div class="messageList">
    <div class="message"
    :class="item.from._id === $store.state.userInfo._id?'self':''"
    v-for="item in messageList"
    :key="item._id">
      <img
        class="avatar"
        :src="item.from.avatar"
        alt
        style="width: 44px; height: 44px; border-radius: 22px;"
      />
      <div class="right">
        <div class="nicknameTimeBlock">
          <span class="tag" style="background-color: rgb(14, 160, 21);">BOT</span>
          <span class="nickname">{{item.from.username}}</span>
          <span class="time">{{covertTime(item.createTime)}}</span>
        </div>
        <div class="contentButtonBlock">
          <div class="content">
            <div class="textMessage">{{item.content}}</div>
          </div>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    messageList: Array,
  },
  data() {
    return {
      // messageList: [],
    };
  },
  methods: {
    covertTime(param:Date) {
      const time = new Date(param);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
  },
});
</script>
<style lang="scss" scoped>
.messageList {
  flex: 1;
  padding: 8px 10px 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
  .message {
    display: flex;
    margin-right: 54px;
    margin-bottom: 10px;
    position: relative;
    .right {
      margin-left: 12px;
      .tag {
        height: 16px;
        line-height: 16px;
        border-radius: 3px;
        padding: 0 5px;
        display: inline-block;
        font-size: 12px;
        background-color: var(--primary-color-9);
        color: var(--primary-text-color-10);
        transform: scale(0.9);
        margin-left: -5px;
        margin-right: 2px;
      }
      .nicknameTimeBlock {
        height: 20px;
        display: flex;
        align-items: flex-end;
        .nickname {
          color: #333;
          font-size: 13px;
          user-select: text;
          margin-right: 4px;
        }
        .time {
          color: #666;
          font-size: 12px;
        }
      }
      .contentButtonBlock {
        display: flex;
        .content {
          display: inline-block;
          color: #555;
          font-size: 14px;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 6px 8px;
          border-radius: 8px;
          border-top-left-radius: 0px;
          margin-top: 3px;
        }
        .textMessage {
          user-select: text;
          word-break: break-word;
        }
      }
      .arrow {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0px 7px 15px 0;
          border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
          position: absolute;
          top: 23px;
          left: 49px;
      }
    }
  }
  .self {
    flex-direction: row-reverse;
    margin-right: 0px;
    margin-left: 54px;
  }
}
</style>
