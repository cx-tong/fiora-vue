import Vue from 'vue';
import Vuex from 'vuex';

/**
 * 拼接用户与好友id
 * @param userId1
 * @param userId2
 */
function getFriendId(userId1: string, userId2: string) {
  if (userId1 < userId2) {
    return userId1 + userId2;
  }
  return userId2 + userId1;
}

/**
 * 将联系人以_id为键转为对象结构
 * @param linkmans 联系人数组
 */
function getLinkmansMap(linkmans: Linkman[]) {
  return linkmans.reduce((map: LinkmansMap, linkman) => {
    const mapTemp = map;
    mapTemp[linkman._id] = linkman;
    return mapTemp;
  }, {});
}

/**
* 将消息以_id为键转为对象结构
* @param messages 消息数组
*/
function getMessagesMap(messages: Message[]) {
  return messages.reduce((map: MessagesMap, message) => {
    const mapTemp = map;
    mapTemp[message._id] = message;
    return mapTemp;
  }, {});
}

/**
* 转换群组数据结构
* @param group 群组
*/
function transformGroup(group: Linkman): Linkman {
  const groupTemp = group;
  Object.assign(groupTemp, { type: 'group', unread: 0, messages: {} });
  groupTemp.creator = groupTemp.creator || '';
  groupTemp.onlineMembers = [];
  return groupTemp;
}

/**
* 转换好友数据结构
* @param friend 好友
*/
function transformFriend(friend: Friend): Linkman {
  const { from, to } = friend;
  const transformedFriend = {
    _id: getFriendId(from as string, (to as User)._id ? (to as User)._id : to as string),
    name: (to as User).username,
    avatar: (to as User).avatar,
    // @ts-ignore
    createTime: friend.createTime,
    type: 'friend',
    unread: 0,
    messages: {},
  };
  return transformedFriend as Linkman;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      _id: '',
      username: '',
      avatar: '',
      tag: '',
      token: '',
      isAdmin: false,
    },
    linkmans: {},
    /** 聚焦的联系人 */
    focus: '',
    /** 客户端的一些状态值 */
    status: {
      /** 声音类型 */
      sound: 'default.mp3',
    },
  },
  getters: {
    // 登录状态
    isLogin(state):boolean {
      return (state.user as User)._id !== '';
    },
  },
  mutations: {
    setTipAudio(state, src:string) {
      state.status.sound = src;
    },
    login(state, user:State['user']) {
      Object.assign(state.user, user);
      if (state.user.token) {
        window.localStorage.setItem('token', state.user.token);
      }
    },
    logout(state) {
      (state.user as Object) = {
        _id: '',
        username: '',
        avatar: '',
        tag: '',
        isAdmin: false,
      };
      state.focus = '';
      state.linkmans = {};
    },
    // 设置当前选中联系人id
    setFocusLinkman(state, id:string) {
      state.focus = id;
      (state.linkmans as LinkmansMap)[id].unread = 0;
    },
    // guest登录
    setGuest(state, { guest, messages }) {
      state.linkmans = getLinkmansMap([transformGroup(guest)]);
      (state.linkmans as LinkmansMap)[guest._id].messages = getMessagesMap(messages);
      state.focus = guest._id;
    },
    createGroup(state, group:Linkman) {
      state.linkmans = Object.assign({}, state.linkmans, getLinkmansMap([transformGroup(group)]));
      state.focus = group._id;
    },
    addGroup(state, { group, messageMap }) {
      state.linkmans = Object.assign({}, state.linkmans, getLinkmansMap([transformGroup(group)]));
      (state.linkmans as LinkmansMap)[group._id].messages = getMessagesMap(messageMap[group._id]);
      state.focus = group._id;
    },
    addFriend(state, { friend, message }) {
      const newLinkman = transformFriend({
        _id: friend._id,
        from: state.user._id,
        to: {
          _id: friend._id,
          username: friend.username,
          avatar: friend.avatar,
        },
        createTime: Date.now(),
      } as Friend);
      state.linkmans = Object.assign({},
        state.linkmans, getLinkmansMap([newLinkman]));
      (state.linkmans as LinkmansMap)[newLinkman._id]
        .messages = getMessagesMap(message[newLinkman._id]);
    },
    deleteLinkman(state, linkmanId:string) {
      Vue.delete(state.linkmans, linkmanId);
      [state.focus] = Object.keys(state.linkmans);
    },
    // 登录后获取最后的群组信息，初始化消息列表
    setLinkmans(state, { groups, friends, messagesMap }) {
      const linkmans:Linkman[] = [];
      groups.forEach((group:Group) => {
        linkmans.push(transformGroup(group as Linkman));
      });
      friends.forEach((friend:Friend) => {
        linkmans.push(transformFriend(friend as Linkman));
      });
      state.linkmans = Object.assign({}, state.linkmans, getLinkmansMap(linkmans));
      Object.keys(state.linkmans).forEach((key) => {
        (state.linkmans as LinkmansMap)[key].messages = getMessagesMap(messagesMap[key]);
      });
      [state.focus] = Object.keys(state.linkmans);
    },
    pushMessagesList(state, message: Message) {
      (state.linkmans as LinkmansMap)[state.focus].messages = Object.assign({},
        (state.linkmans as LinkmansMap)[state.focus].messages, getMessagesMap([message]));
    },
    changeUsername(state, name:string) {
      state.user.username = name;
    },
    changeGroupName(state, { id, name }) {
      (state.linkmans as LinkmansMap)[id].name = name;
    },
  },
  actions: {
    SOCKET_message(store, message: Message) {
      const { state } = store;
      if (!(state.linkmans as LinkmansMap)[message.to]) {
        const messagesMap: { [messageId: string]: Message[] } = {};
        messagesMap[message.to] = [message];
        store.commit('addFriend', { friend: message.from, message: messagesMap });
      }
      Vue.set((state.linkmans as LinkmansMap)[message.to].messages, message._id, message);
      if (message.to !== state.focus) {
        (state.linkmans as LinkmansMap)[message.to]
          .unread = (state.linkmans as LinkmansMap)[message.to].unread + 1;
      }
    },
  },
  modules: {
  },
});
