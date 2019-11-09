<template>
  <div class="linkman"
  :class="groupInfo._id === $store.state.linkmanFocusId?'focus':''"
  @click="switchGroup">
    <img
      class
      :src="groupInfo.avatar"
      alt
      style="width: 48px; height: 48px; border-radius: 24px;"
    />
    <div class="container">
      <div class="rowContainer nameTimeBlock">
        <p class="nameit">{{groupInfo.name}}</p>
        <p class="time" v-if="preview._id!==undefined">
          {{covertTime(preview.createTime)}}</p>
      </div>
      <div class="rowContainer previewUnreadBlock"
      v-if="preview._id===undefined">
        <p class="preview">暂无消息</p>
      </div>
      <div class="rowContainer previewUnreadBlock" v-else>
        <p class="preview">{{preview.from.username}}:
          {{preview.type==='text'?
          preview.content
          :preview.type}}</p>
        <p class="unread" v-if="unread!==0">{{unread}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    groupInfo: Object,
    preview: Object,
  },
  data() {
    return {
      unread: 0,
    };
  },
  mounted() {
    console.log(this.preview);
    console.log(this.preview._id === undefined);
  },
  methods: {
    covertTime(param:Date) {
      const time = new Date(param);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
    switchGroup() {
      this.$store.commit('setFocusLinkman', this.groupInfo._id);
      this.unread = 0;
    },
  },
  sockets: {
    message(res:Message) {
      if (res.to === this.groupInfo._id && this.$store.state.linkmanFocusId !== res.to) {
        this.unread = this.unread + 1;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
  .linkman {
      height: 70px;
      display: flex;
      padding: 10px 16px;
      cursor: default;
      transition: background-color 0.2s;
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
    .nameit {
      color:rgba(247, 247, 247, 1);
    }
    .name {
        color:rgba(247, 247, 247, 1);
        font-size: 14px;
    }
    .time {
        color:rgba(247, 247, 247, 1);
        font-size: 12px;
        position: relative;
        top: 4px;
    }
    .previewUnreadBlock {
        margin-top: 6px;
    }
    .preview {
        color:rgba(247, 247, 247, 1);
        font-size: 12px;
        width: 188px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .unread {
      color:rgba(247, 247, 247, 1);
      background-color: rgba(74, 144, 226, 1);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      text-align: center;
    }
  }
  // 深度选择bug
  .focus {
    background-color: rgba(74, 144, 226, 0.4);
  }
</style>
