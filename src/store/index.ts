import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
interface UserInfo {
  groups:[
    {
      _id:string
    }
  ],
}
export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    linkmanFocusId: '',
  },
  mutations: {
    setUserInfo(state, userInfo:UserInfo) {
      state.userInfo = userInfo;
      state.isLogin = true;
      state.linkmanFocusId = userInfo.groups[0]._id;
    },
    setFocusLinkman(state, id) {
      state.linkmanFocusId = id;
    },
  },
  actions: {
  },
  modules: {
  },
});
