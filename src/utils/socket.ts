import Vue from 'vue';
import store from '../store';
import Message from '../components/Message';

const VueSocketIO = require('vue-socket.io');

const socket = new VueSocketIO({
  debug: true,
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
    socket.io.emit(event, data, (res:any) => {
      if (typeof (res) === 'string') {
        // if (toast) {
        //     Message.error(res);
        // }
        // if (res === SealText) {
        //     isSeal = true;
        //     setTimeout(() => { isSeal = false; }, SealTimeout);
        // }
        Message({
          content: res,
          type: 'error',
        });
        resolve([res, null]);
      } else {
        resolve([null, res]);
      }
    });
  });
}

Vue.use(socket);
Vue.prototype.$fetch = fetch;
