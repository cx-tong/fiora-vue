declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}
declare module 'Vue/types/vue' {
  // 声明为 Vue 补充的东西
    interface Vue {
      $socket: Object,
    }
  }
