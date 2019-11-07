import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './assets/styles/iconfont.scss';

const VueSocketIO = require('vue-socket.io');

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    sockets?: {}
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $socket: any,
  }
}
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'https://fiora.suisuijiang.com/',
  connection: 'http://localhost:9200/',
}));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
