import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './types/type';
import './utils/utils';
import './utils/socket';
import './assets/styles/iconfont.css';
import './assets/styles/normalize.css';
import Message from './components/Message';

Vue.prototype.$message = Message;

const VueSocketIO = require('vue-socket.io');

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    sockets?: {},
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $socket: any,
    tipAudio ?: any,
    $fetch: any,
    $message: any,
  }
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
