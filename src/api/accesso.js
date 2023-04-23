import request from '@/utils/request';

// 获取配件设置
export function getList() {
  return request({
    url: '/api/Accessory/getAccessoryList',
    method: 'get',
  });
}

export function getAccessoryByID(accessoId) {
  return request({
    url: '/api/Accessory/GetAccessoryByID',
    method: 'get',
    params: {
      ID: accessoId,
    },
  });
}

export function addAccessory(data) {
  return request({
    url: '/api/Accessory/addAccessory',
    method: 'post',
    data,
  });
}

export function deleteAccessory(data) {
  return request({
    url: '/api/Accessory/deleteAccessory',
    method: 'post',
    params: {
      ID: data,
    },
  });
}

export function updateAccessory(data) {
  return request({
    url: '/api/Accessory/updateAccessory',
    method: 'post',
    data,
  });
}

export function getPatrolDicByType() {
  return request({
    url: '/api/Accessory/getAccessoryTypeList',
    method: 'get',
  });
}

export function getPatrolDicByState() {
  return request({
    url: '/api/Accessory/getAccessoryStateList',
    method: 'get',
  });
}

export function getPatrolDicByCamera() {
  return request({
    url: '/api/Accessory/getCameraTypeList',
    method: 'get',
  });
}

export function getPatrolDicByBrand() {
  return request({
    url: '/api/Accessory/getBrandTypeList',
    method: 'get',
  });
}
