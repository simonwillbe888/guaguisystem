/* eslint-disable */
import Vue from 'vue'
import Vcomp from './components/index'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/en'; // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
ElementUI.Dialog.props.closeOnClickModal.default = false

import '@/styles/index.scss' // global css

import App from './App';
import store from './store';
import router from './router';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueClipboard from 'vue-clipboard2'
import '@/icons'; // icon
import '@/permission' // permission control
import i18n from './langs/index'
import moment from 'moment'
import './assets/css/casun.scss'
import './utils/directives.js'
import JSEncrypt from 'jsencrypt'
import echarts from 'echarts'
import dataV from '@jiaminghi/data-view'
import { getPageTitle } from './assets/js/title'
import 'swiper/dist/css/swiper.css'
import flv from 'flv.js'
import "font-awesome/css/font-awesome.min.css"


// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'

// // import style (<= Swiper 5.x)
// import 'swiper/css/swiper.css'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'

/*if (process.env.NODE_ENV === 'production') {
  mockXHR()
}*/

// 全局视频图片地址根路径
// Vue.prototype.$baseUrl = 'http://192.168.0.101:9096'
Vue.prototype.$baseUrl = 'http://192.168.0.120:9096'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = getPageTitle(i18n, to.meta.title);
  }
  next();
});

// set ElementUI lang to EN
Vue.use(ElementUI, {
  enLocale,
  zhLocale,
});
Vue.use(VueClipboard)
Vue.use(Vcomp);
Vue.use(dataV);
Vue.use(VueAwesomeSwiper);
Vue.use(flv)

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
// 注册方法
Vue.prototype.$getRsaCode = function(str) {
  // 引用 rsa 公钥
  let pubKey =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC55vjYCkfiaaUwQOMb0xnToVJU1/MKe/9oXdsoPFAc5eXSzeOtCHJFbz9aHbOvLukgwTtRXo2AQa3syvSx0zEnm+x2akegrfT/+9TF9pEVqPFSfhO+JteYGTGwF2KyKiE9XfWCJ+TXMfIEqHWuaA5iHDyXaWzSldkMZOC1jLQrxwIDAQAB';
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
};

if (process.env.NODE_ENV === 'production') {
  if (window) {
    window.console.log = function () {};
  }
}

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  data: function() {
    return {
      allInspectArr: [],
      inspectsVal: [],
    };
  },
  render: (h) => h(App),
});
