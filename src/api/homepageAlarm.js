import request from '@/utils/request'

// 指定时间段内不同等级、不同处理结果的告警数量 (图1)
export function getCountByLevelAndStatus (data) {
  return request({
    url: '/api/AlarmData/getCountByLevelAndStatus',
    method: 'post',
    data,
  })
}
// 获取指定时间段内告警发生率(图2)
export function getCountByOccur (data) {
  return request({
    url: '/api/AlarmData/getCountByOccur',
    method: 'post',
    data,
  })
}
// 获取指定时间段内不同等级的告警数量 (图3)
export function getCountByLevel (data) {
  return request({
    url: '/api/AlarmData/getCountByLevel',
    method: 'post',
    data,
  })
}
// 获取指定时间段内不同类型的告警数量 (图4)
export function getCountByCode (data) {
  return request({
    url: '/api/AlarmData/getCountByCode',
    method: 'post',
    data,
  })
}
export function getCountByDate (data) {
  return request({
    url: '/api/AlarmData/getCountByDate',
    method: 'post',
    data,
  })
}
