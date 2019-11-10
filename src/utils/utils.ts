import Vue from 'vue';

interface Utils {
  getFriendId: Function,
}
const utils = {
  getFriendId: (userId1: string, userId2: string) => {
    if (userId1 < userId2) {
      return userId1 + userId2;
    }
    return userId2 + userId1;
  },
} as Utils;

declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils,
  }
}

Vue.prototype.$utils = utils;
