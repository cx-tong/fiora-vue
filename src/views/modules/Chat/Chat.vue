<template>
  <div class="chat">
    <header-bar :linkman ="focusLinkman" @showSidePanel="showSidePanel"/>
    <message-list :messagesList="focusLinkman?focusLinkman.messages:{}"/>
    <chat-input />
    <group-manage-panel ref="groupManagePanel" :linkman ="focusLinkman"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import HeaderBar from './HeaderBar.vue';
import MessageList from './MessageList.vue';
import ChatInput from './ChatInput.vue';
import GroupManagePanel from './GroupManagePanel.vue';

export default Vue.extend({
  components: {
    HeaderBar,
    MessageList,
    ChatInput,
    GroupManagePanel,
  },
  computed: {
    focusLinkman: {
      get():Linkman {
        return this.$store.state.linkmans[this.$store.state.focus];
      },
    },
  },
  methods: {
    showSidePanel() {
      (this.$refs.groupManagePanel as any).show();
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
