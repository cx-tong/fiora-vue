import Vue from 'vue';

interface Utils {
  getFriendId: Function,
  covertTime: Function,
}

const utils = {
  /**
   * 拼接用户与好友id
   * @param userId1
   * @param userId2
   */
  getFriendId: (userId1: string, userId2: string) => {
    if (userId1 < userId2) {
      return userId1 + userId2;
    }
    return userId2 + userId1;
  },
  covertTime: (param:Date) => {
    const time = new Date(param);
    const hour = time.getHours();
    const minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    const second = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    return `${hour}:${minute}:${second}`;
  },
} as Utils;

declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils,
  }
}

Vue.prototype.$utils = utils;
