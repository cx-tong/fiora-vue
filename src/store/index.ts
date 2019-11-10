import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface MessagesList {
  [key:string]: Message[],
}

export default new Vuex.Store({
  state: {
    isLogin: false, // 登录状态
    userInfo: {}, // 当前登录人信息
    linkmanFocusId: '', // 当前选中联系人id
    messagesList: {}, // 消息列表，包括群组和好友
    showMessages: [],
  },
  mutations: {
    setUserInfo(state, userInfo:User) {
      state.userInfo = userInfo;
      state.isLogin = true;
      state.linkmanFocusId = userInfo.groups[0]._id;
    },
    // 设置当前选中联系人id
    setFocusLinkman(state, id:string) {
      state.linkmanFocusId = id;
    },
    addGroupInfo(state, groupInfo:Group) {
      (state.userInfo as User).groups.push(groupInfo);
      Vue.set(state.messagesList, groupInfo._id, []);
    },
    addFriendInfo(state, friendInfo:{id:string, friend: User}) {
      (state.userInfo as User).friends.push(friendInfo.friend);
      Vue.set(state.messagesList, friendInfo.id, []);
    },
    // 获取最后的群组信息，初始化消息列表
    initMessagesList(state, messagesList:MessagesList) {
      state.messagesList = messagesList;
    },
    addMessagesList(state, messages:{id: string, message: Message[]}) {
      (state.messagesList as MessagesList)[messages.id].push(...messages.message);
    },
    pushMessagesList(state, messages:{id: string, message: Message}) {
      (state.messagesList as MessagesList)[messages.id].push(messages.message);
    },
  },
  actions: {
  },
  modules: {
  },
});
