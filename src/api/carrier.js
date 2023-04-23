import request from '@/utils/request'

export function getAllCarriers() {
  return request({
    url: '/api/CarrierGroup/GetAllCarrierDetailInfo',
    method: 'get'
  })
}

export function addCarrier(data) {
  return request({
    url: '/api/CarrierGroup/AddCarrier',
    method: 'post',
    data: data
  })
}
export function updateCarrier(data) {
  return request({
    url: '/api/CarrierGroup/UpdateCarrier',
    method: 'post',
    data: data
  })
}
export function deleteCarrier(data) {
  return request({
    url: '/api/CarrierGroup/DeleteCarrier',
    method: 'post',
    data: data
  })
}
