<template>
  <div class="chat">
    <header-bar :groupInfo ="messageInfo.name" />
    <message-list :messageList = "$store.state.messagesList[$store.state.linkmanFocusId]" />
    <chat-input @updateMessageList = "updateMessageList" />
    <!-- <group-manage-panel /> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import HeaderBar from './HeaderBar.vue';
import MessageList from './MessageList.vue';
import ChatInput from './ChatInput.vue';

export default Vue.extend({
  components: {
    HeaderBar,
    MessageList,
    ChatInput,
  },
  props: {
    messageInfo: Object,
  },
  methods: {
    updateMessageList(userMessage:Message) {
      this.$store.commit('pushMessagesList', { id: this.$store.state.linkmanFocusId, message: userMessage });
    },
  },
  sockets: {
    message(res:Message) {
      this.$store.state.messagesList[res.to].push(res);
    },
  },
});
</script>
<style lang="scss" scoped>
  .chat {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: rgba(241, 241, 241, 0.6);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
