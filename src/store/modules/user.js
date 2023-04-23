import { login, logOut, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  account: '',
  name: '',
  role: '',
  roles: [],
  webSocketUrl: '',
  systemConfig: {
    webRtcIP: '',
    fileAddress: '',
  },
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account;
  },

  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_WEB_SOCKET_URL: (state, webSocketUrl) => {
    state.webSocketUrl = webSocketUrl;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((response) => {
          if (response.code === 20000) {
            const { data } = response;
            commit('SET_TOKEN', response.data);
            setToken(response.data);
            resolve();
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          if (response.code === 20000) {
            commit('SET_ACCOUNT', response.data.userName);
            commit('SET_NAME', response.data.nickName);
            commit('SET_ROLE', response.data.roleName);
            commit('SET_ROLES', response.data.powerList);
            commit('SET_WEB_SOCKET_URL', response.data.socketURL);
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      log0ut(state.token)
        .then((res) => {
          console.log("查看登出",res)
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
