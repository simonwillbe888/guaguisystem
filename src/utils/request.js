import axios from 'axios';
import { MessageBox, Message, Notification } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { blob, timeout } from 'd3';
let disconnect = 0
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost:8011',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['Token'] = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    //cgw
    // return {}
    //cgw
    const res = response.data;
    if (res.code !== 20000 && res.code !== undefined && res.code !== 9999 && res.code !== 20003 ) {
      // console.log("查看错误", res)
      Notification({
        title: '提示',
        duration: 5000,
        message:  res.data.includes('NET')? '云台登录异常' :res.data || 'Error',
        type: 'error',
        // duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        console.log("查看错误", res)

        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        ).then(() => {
          console.log('断开')
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      return res;
      //   return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    //cgw
    // return {}
    //cgw
    // console.log('服务器连接失败' + error); // for debug
    // store.dispatch('global/setlogoutState',++disconnect).then(()=>{
      console.log('失败原因')
    // })
    // Notification({
    //   title: '提示',
    //   duration: 1000,
    //   message:  '服务器连接失败',
    //   type: 'error',
    //   // duration: 5 * 1000,
    // });
    return 'timeout';
  }
);

export default service;
