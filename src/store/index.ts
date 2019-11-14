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
function transformFriend(friend: Linkman): Linkman {
  // @ts-ignore
  const { from, to } = friend;
  const transformedFriend = {
    _id: getFriendId(from, to._id ? to._id : to),
    name: to.username,
    avatar: to.avatar,
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
      isAdmin: false,
    },
    linkmans: {},
    /** 聚焦的联系人 */
    focus: '',
    /** 客户端连接状态 */
    connect: false,
    /** 客户端的一些状态值 */
    status: {
      /** 是否显示登陆注册框 */
      loginRegisterDialogVisible: false,
      /** 主题 */
      theme: '',
      /** 主题主色调 */
      primaryColor: '',
      /** 主题文字主色调 */
      primaryTextColor: '',
      /** 背景图 */
      backgroundImage: '',
      /** 启用毛玻璃效果 */
      aero: false,
      /** 新消息声音提示开关 */
      soundSwitch: false,
      /** 声音类型 */
      sound: 'default.mp3',
      /** 新消息桌面提醒开关 */
      notificationSwitch: false,
      /** 新消息语言朗读开关 */
      voiceSwitch: false,
      /** 是否朗读个人发送的消息开关 */
      selfVoiceSwitch: false,
      /**
       * 用户标签颜色模式
       * singleColor: 固定颜色
       * fixedColor: 同一词始终同一颜色
       * randomColor: 同一词在每次渲染中保持同一颜色
       */
      tagColorMode: '',
      /** 是否展示侧边栏 */
      sidebarVisible: false,
      /** 是否展示搜索+联系人列表栏 */
      functionBarAndLinkmanListVisible: false,
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
      (state.linkmans as any)[id].unread = 0;
    },
    // guest登录
    setGuest(state, { guest, messages }) {
      state.linkmans = getLinkmansMap([transformGroup(guest)]);
      (state.linkmans as LinkmansMap)[guest._id].messages = getMessagesMap(messages);
      state.focus = guest._id;
    },
    createGroup(state, group:Linkman) {
      console.log(group);
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
      } as any);
      state.linkmans = Object.assign({},
        state.linkmans, getLinkmansMap([newLinkman]));
      (state.linkmans as LinkmansMap)[newLinkman._id]
        .messages = getMessagesMap(message[newLinkman._id]);
      state.focus = newLinkman._id;
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
      (state.linkmans as any)[state.focus].messages = Object.assign({},
        (state.linkmans as any)[state.focus].messages, getMessagesMap([message]));
    },
  },
  actions: {
    SOCKET_message({ state }, message:any) {
      Vue.set((state.linkmans as any)[message.to].messages, message._id, message);
      if (message.to !== state.focus) {
        (state.linkmans as any)[message.to].unread = (state.linkmans as any)[message.to].unread + 1;
      }
    },
  },
  modules: {
  },
});
