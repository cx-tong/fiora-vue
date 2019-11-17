import Vue, { VueConstructor } from 'vue';
import Message from './Message.vue';

const MessageBox = Vue.extend(Message);

(Message as any).install = (options:any) => {
  const message = new MessageBox({ data: options }).$mount();
  document.body.appendChild(message.$el);
  Vue.nextTick(() => {
    message.showStatus = true;
  });
};
export default (Message as any).install;
