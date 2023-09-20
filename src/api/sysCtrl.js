import request from '@/utils/request';
import request3 from '@/utils/request3'
export function getRole() {
  return request({
    url: '/api/Role/getRole',
    method: 'get',
  });
}


export function getUserList(data) {
  return request({
    url: '/api/User/getUserList',
    method: 'post',
    data,
  });
}

export function deleteUser(name) {
  return request({
    url: '/api/User/deleteUser?userID='+ name,
    method: 'post',
  });
}
export function tianjiaUser(data) {
  return request({
    url: '/api/User/addUser',
    method: 'post',
    data,
  });
}

export function updateUser(data) {
  return request({
    url: '/api/User/updateUser',
    method: 'post',
    data,
  });
}

export function getRoleList(data) {
  return request({
    url: '/api/Role/getRoleList',
    method: 'post',
    data,
  });
}
export function downLoadBatchPTZFile(data) {
  return request({
    url: '/api/HKControl/downLoadBatchPTZFile',
    method: 'post',
    data,
  });
}
export function getDownLoadFile(data) {
  return request({
    url: '/api/System/getDownLoadFile?fileName=' + data ,
    method: 'get',
  });
}
export function deleteRole(data) {
  return request({
    url: '/api/Role/deleteRole?roleID='+ data,
    method: 'post',
  });
}

export function addRole(data) {
  return request({
    url: '/api/Role/addRole',
    method: 'post',
    data,
  });
}

export function updateRole(data) {
  return request({
    url: '/api/Role/updateRole',
    method: 'post',
    data,
  });
}

export function getPowerList(data) {
  return request({
    url: '/api/Power/getPowerList',
    method: 'get',
  });
}

export function deletePower(data) {
  return request({
    url: '/api/Power/deletePower',
    method: 'post',
    data,
  });
}

export function addPower(data) {
  return request({
    url: '/api/Power/addPower',
    method: 'post',
    data,
  });
}

export function updatePower(data) {
  return request({
    url: '/api/Power/updatePower',
    method: 'post',
    data,
  });
}

export function getPowerListByRoleID(data) {
  return request({
    url: '/api/Power/getPowerListByRoleID?roleID='+ data,
    method: 'post',
  });
}

export function getSystemXmlConfig() {
  return request({
    url: '/api/SystemConfig/GetSystemXmlConfig',
    method: 'get',
  });
}
export function setSystemXmlConfig(data) {
  return request({
    url: '/api/SystemConfig/SetSystemXmlConfig',
    method: 'post',
    data,
  });
}
export function restartSystem(data) {
  return request({
    url: '/api/System/restartSystem?flag='+ data,
    method: 'post',
  });
}
export function licenseChecker (data) {
  return request({
    url: '/api/SystemConfig/licenseChecker',
    method: 'get',
    data,
  })
}

export function uploadLicense (data) {
  return request({
    url: '/api/SystemConfig/uploadLicense',
    method: 'post',
    data,
  })
}

export function getLicenseStatus (data) {
  return request({
    url: '/api/SystemConfig/getLicenseStatus',
    method: 'get',
    data,
  })
}
