import request from '@/utils/request'

export function getMapData() {
  return request({
    url: '/api/Map/GetMapData',
    method: 'get',
  })
}

export function getAllCarrierDetailInfo() {
  return request({
    url: '/api/CarrierGroup/GetAllCarrierDetailInfo',
    method: 'get'
  })
}

export function moveToVertex(data) {
  return request({
    url: '/api/CarrierGroup/MoveToVertex',
    method: 'post',
    data
  })
}

export function getAllLocationInfo() {
  return request({
    url: '/api/Location/GetAllLocationInfo',
    method: 'get'
  })
}

export function getCarrierDetailInfo(catid) {
  return request({
    url: '/api/CarrierGroup/GetCarrierDetailInfo?CarrierIndex='+ catid,
    method: 'post'
  })
}