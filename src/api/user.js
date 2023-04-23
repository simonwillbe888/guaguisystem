import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/api/User/login',
    method: 'post',
    data,
  });
}

export function getInfo(token) {
  return request({
    url: '/api/User/getUserInfo?token=' + token,
    method: 'post',
  });
}

export function remoteLoginOut() {
  return request({
    url: '/api/User/remoteLoginOut',
    method: 'post',
  });
}

export function logOut() {
  return request({
    url: '/api/User/loginOut',
    method: 'post',
  });
}
export function getAllUser() {
  return request({
    url: '/api/User/GetAllUser',
    method: 'get',
  });
}

export function addUser(data) {
  return request({
    url: '/api/User/AddUser',
    method: 'post',
    data: data,
  });
}

export function deleteUser(name) {
  return request({
    url: '/api/User/DeleteUser?userID='+ name,
    method: 'post',
  });
}

export function updateUser(data) {
  return request({
    url: '/api/User/UpdateUser',
    method: 'post',
    data: data,
  });
}

export function getAlarmNotice() {
  return request({
    url: '/api/AlarmRecord/getAlarmNotice',
    method: 'get',
  });
}
//已读告警回传
export function readNoticeBack(data) {
  return request({
    url: '/api/AlarmRecord/readNoticeBack',
    method: 'post',
    params: data,
  });
}
