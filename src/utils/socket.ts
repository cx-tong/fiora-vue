import Vue from 'vue';
import store from '../store';
import Tip from '../views/modules/Tip.vue';

const TipShow = Vue.component('Tip', Tip);
const VueSocketIO = require('vue-socket.io');

const socket = new VueSocketIO({
  debug: true,
  // connection: 'https://fiora.suisuijiang.com/',
  connection: 'http://localhost:9200/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
});

/** 用户是否被封禁 */
// let isSeal = false;

function fetch<T = any>(event: string, data = {}, {
  toast = true,
} = {}): Promise<[any, any]> {
  // if (isSeal) {
  //     return Promise.resolve([SealText, null]);
  // }
  return new Promise((resolve) => {
    console.log(socket);
    socket.io.emit(event, data, (res:any) => {
      if (typeof (res) === 'string') {
        // if (toast) {
        //     Message.error(res);
        // }
        // if (res === SealText) {
        //     isSeal = true;
        //     setTimeout(() => { isSeal = false; }, SealTimeout);
        // }
        Object.assign(new TipShow(), { tipText: res }).$mount('.tip');
        resolve([res, null]);
      } else {
        resolve([null, res]);
      }
    });
  });
}

Vue.use(socket);
Vue.prototype.$fetch = fetch;
