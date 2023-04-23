const state = {
  systemConfig: {
    webRtcIP: '',
    fileAddress: '',
  },
};

const mutations = {
  SET_SYS_SETTING: (state, systemConfig) => {
    state.systemConfig = systemConfig;
  },
};

const actions = {
  setSystemConfig({ commit }, sysConfig) {
    commit('SET_SYS_SETTING', sysConfig);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
