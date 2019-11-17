<template>
  <div class="messageList show-scrollbar" ref="messageList">
    <div class="message"
    :class="value.from._id === $store.state.user._id?'self':''"
    v-for="(value, key) in messagesList"
    :key="key">
      <img
        class="avatar"
        :src="value.from.avatar"
        style="width: 44px; height: 44px; border-radius: 22px;"
      />
      <div class="right">
        <div class="nicknameTimeBlock">
          <span class="tag" style="background-color: rgb(14, 160, 21);"
          v-if="value.from.tag">{{value.from.tag}}</span>
          <span class="nickname">{{value.from.username}}</span>
          <span class="time">{{$utils.covertTime(value.createTime)}}</span>
        </div>
        <div class="contentButtonBlock">
          <div class="content" v-if="value.type==='text'">
            <div class="textMessage">{{value.content}}</div>
          </div>
          <div class="content" v-else-if="value.type==='image'">
            <img :src="value.content" />
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
    messagesList: Object,
  },
  watch: {
    messagesList() {
      this.$nextTick(() => {
        const scroll: any = this.$refs.messageList;
        scroll.scrollTop = scroll.scrollHeight;
      });
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
      .right {
        .contentButtonBlock {
          flex-direction: row-reverse;
          .content {
            margin-right: 12px;
            border-top-left-radius: 8px;
            border-top-right-radius: 0px;
            background-color: rgba(74, 144, 226, 1);
            .textMessage {
              color: white;
            }
          }
        }
        .arrow {
          left: initial;
          right: 49px;
          border-width: 0 0 15px 7px;
          border-color: transparent transparent transparent rgba(74, 144, 226, 1);
        }
      }
    }
  }
  .show-scrollbar::-webkit-scrollbar {
    display: block;
    width: 6px;
    height: 6px;
  }
</style>
