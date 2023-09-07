import request from '@/utils/request';

export function getChargeSetting() {
  return request({
    url: '/api/Charge/GetChargeSetting',
    method: 'get',
  });
}

export function getAllChargeDevice() {
  return request({
    url: '/api/Charge/GetAllChargeDevice',
    method: 'get',
  });
}

export function getStation() {
  return request({
    url: '/api/ChargeSetting/getStation',
    method: 'get',
  });
}
export function getChargeDevice(data) {
  return request({
    url: '/api/Charge/GetChargeDevice',
    method: 'post',
    data,
  });
}

export function deleteChargeDevice(data) {
  return request({
    url: '/api/Charge/DeleteChargeDevice',
    method: 'post',
    data,
  });
}

export function addChargeDevice(data) {
  return request({
    url: '/api/Charge/AddChargeDevice',
    method: 'post',
    data,
  });
}

export function updateChargeDevice(data) {
  return request({
    url: '/api/Charge/UpdateChargeDevice',
    method: 'post',
    data,
  });
}

export function getProtocalType() {
  return request({
    url: '/api/PatrolDic/GetPatrolDicByType?dicType=EProtocol',
    method: 'get',
  });
}

//获协议类型
export function getChargeProtocolType() {
  return request({
    url: '/api/ChargeSetting/getChargeProtocolType',
    method: 'get',
  });
}
//获取充电方式
export function getChargingWay() {
  return request({
    url: '/api/ChargeSetting/getChargingWay',
    method: 'get',
  });
}
//获取小车类型
export function getCharrierType() {
  return request({
    url: '/api/ChargeSetting/getCharrierType',
    method: 'get',
  });
}

//新增充电站
export function addChargePileSetting(data) {
  return request({
    url: '/api/ChargeSetting/addChargePileSetting',
    method: 'post',
    data,
  });
}
//修改充电站
export function updateChargeSetting(data) {
  return request({
    url: '/api/ChargeSetting/updateChargeSetting',
    method: 'post',
    data,
  });
}
//删除充电站
export function deleteChargePileSetting(data) {
  return request({
    url: '/api/ChargeSetting/deleteChargePileSetting',
    method: 'post',
    params: data,
  });
}

//获取充电站数据
export function getChargePileSettingList() {
  return request({
    url: '/api/ChargeSetting/getChargePileSettingList',
    method: 'get',
  });
}
// 新增充电策略
export function addNormalStrategy(data) {
  return request({
    url: '/api/ChargeSetting/addNormalStrategy',
    method: 'post',
    data,
  });
}
// 更新充电策略
export function updateNormalStrategy(data) {
  return request({
    url: '/api/ChargeSetting/updateNormalStrategy',
    method: 'post',
    data,
  });
}

// 删除充电策略
export function deleteNormalStrategy(data) {
  return request({
    url: '/api/ChargeSetting/deleteNormalStrategy',
    method: 'post',
    params: data,
  });
}
//锁定充电站
export function lockChargePile(data) {
  return request({
    url: '/api/ChargeSetting/lockChargePile',
    method: 'post',
    params: data,
  });
}
//解锁充电站
export function unLockChargePile(data) {
  return request({
    url: '/api/ChargeSetting/unLockChargePile',
    method: 'post',
    params: data,
  });
}
//启用充电策略
export function setStrategyEnable(data) {
  return request({
    url: '/api/ChargeSetting/setStrategyEnable',
    method: 'post',
    params: data,
  });
}
//停用用充电策略
export function setStrategyUnEnable(data) {
  return request({
    url: '/api/ChargeSetting/setStrategyUnEnable',
    method: 'post',
    params: data,
  });
}
//获取充电策略
export function getNormalStrategyList() {
  return request({
    url: '/api/ChargeSetting/getNormalStrategyList',
    method: 'get',
  });
}
