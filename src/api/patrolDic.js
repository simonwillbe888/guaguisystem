import request from '@/utils/request'

export function getPatrolDicByType () {
  return request({
    url: '/api/PatrolDic/GetPatrolDicByType?dicType=ECarrierType',
    method: 'get',
  })
}