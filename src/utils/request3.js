import axios from 'axios';
import { MessageBox, Message, Notification } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { blob, timeout } from 'd3';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost:8011',
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json',
  },
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 600000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      Notification({
        title: '提示',
        message:  '加载中',
        duration:0
      });

      config.headers['Token'] = getToken();
    }
    return config;
  },
  (error) => {
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
    Notification.closeAll()
    if (res.code !== 20000 && res.code !== undefined  ) {
      // console.log("查看错误", res)
      Notification({
        title: '提示',
        duration: 1000,
        message: res.data || 'Error',
        type: 'error',
        // duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
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
    console.log('err' + error); // for debug
    Notification({
      title: '提示',
      message: "服务器连接失败",
      type: 'error',
      duration: 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
