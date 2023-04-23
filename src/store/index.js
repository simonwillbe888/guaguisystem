import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import permission from './modules/permission';
import settings from './modules/settings';
import user from './modules/user';
import carrier from './modules/carrier';
import sysConfig from './modules/systemConfig';
import global from './modules/global';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user,
    carrier,
    sysConfig,
    global,
  },
  getters,
});

export default store;
