<template>
  <div class="settingDialog" @click="showState = false" v-if="showState">
    <div class="mainPanel" @click.stop>
      <div class="header">
        <label>设置</label>
        <div class="closeButton" @click="showState=false">
          <i class="iconfont icon-close"/>
        </div>
      </div>
      <div class="body">
        <p>提示音</p>
        <div class="buttons">
          <div class="switchButton"
          :class="$store.state.status.sound === item.src?'select':''"
          @click="setAudio(item.src)"
            v-for="item in audioList" :key="item.index">
            <div class="text">{{item.text}}</div>
            <div class="dot"></div>
          </div>
        </div>
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
      audioList: [
        { text: '默认', src: 'default.mp3' },
        { text: '苹果', src: 'apple.mp3' },
        { text: '电脑qq', src: 'pcqq.mp3' },
        { text: '手机qq', src: 'mobileqq.mp3' },
        { text: '陌陌', src: 'momo.mp3' },
        { text: '滑稽', src: 'huaji.mp3' },
      ],
    };
  },
  methods: {
    show() {
      this.showState = true;
    },
    setAudio(src:string) {
      console.log(this);
      this.$store.commit('setTipAudio', src);
      (this.tipAudio as any).src = `./audios/${src}`;
      (this.tipAudio as any).play();
    },
  },
});
</script>
<style lang="scss" scoped>
  .settingDialog {
    background-color: rgba(55, 55, 55, 0.6);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
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
      .header {
        display: flex;
        border-bottom: #ccc 1px solid;
        justify-content: space-between;
        .closeButton {
          cursor: pointer;
        }
      }
      .body {
        .buttons {
          display: flex;
          flex-wrap: wrap;
          .switchButton {
            cursor: pointer;
            width: 110px;
            height: 34px;
            margin: 5px;
            display: flex;
            padding: 10px 20px;
            align-items: center;
            justify-content: space-between;
            border: solid 1px rgba(55, 55, 55, 0.6);
            * {
              line-height: 34px;
            }
            .text {
              font-size: 12px;
            }
            .dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: rgba(55, 55, 55, 0.6);
            }
          }
          .select {
            border: solid 1px rgb(140, 185, 253);
            .dot {
              background-color: rgb(140, 185, 253);
            }
          }
        }
      }
    }
  }
</style>
