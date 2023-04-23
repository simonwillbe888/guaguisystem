import request from '@/utils/request';

// 报警列表
export function getAlarmSetList(data) {
  return request({
    url: '/api/AlarmSet/getAlarmSetList',
    method: 'post',
    data,
  });
}
// 新增报警
export function getAddAlarmSet(data) {
  return request({
    url: '/api/AlarmSet/addAlarmSet',
    method: 'post',
    data,
  });
}
// 修改报警
export function getUpdateAlarmSet(data) {
  return request({
    url: '/api/AlarmSet/updateAlarmSet',
    method: 'post',
    data,
  });
}

// 删除报警
export function getDeleteAlarmSet(data) {
  return request({
    url: '/api/AlarmSet/deleteAlarmSet?ID=' + data,
    method: 'post',
  });
}
// 告警类型
export function getAlarmTypeList() {
  return request({
    url: '/api/AlarmSet/getAlarmTypeList',
    method: 'get',
  });
}
// 设备类型
export function getDeviceTypeList() {
  return request({
    url: '/api/AlarmSet/getDeviceTypeList',
    method: 'get',
  });
}
// 报警级别
export function getAlarmLevelList() {
  return request({
    url: '/api/AlarmRecord/getAlarmLevelList',
    method: 'get',
  });
}
// 处理方式
export function getDealModeList() {
  return request({
    url: '/api/AlarmSetDetail/getDealModeList',
    method: 'get',
  });
}
// 报警明细
export function getAlarmSetDetailList(data) {
  return request({
    url: '/api/AlarmSetDetail/getAlarmSetDetailList?alarmSetID=' + data,
    method: 'post',
  });
}
// 编辑报警明细
export function getUpdateAlarmSetDetail(data) {
  return request({
    url: '/api/AlarmSetDetail/saveAlarmSetDetail',
    method: 'post',
    data,
  });
}
export function getAreaList() {
  return request({
    url: '/api/Area/GetList',
    method: 'get',
  });
}

export function getDetectList() {
  return request({
    url: '/api/DetectPoint/GetList',
    method: 'get',
  });
}

export function addAlarmSet(data) {
  return request({
    url: '/api/PatrolAlarmSet/AddAlarmSet',
    method: 'post',
    data,
  });
}

export function getAlarmSet(ID) {
  return request({
    url: '​/api/PatrolAlarmSet/GetAlarmSet',
    method: 'get',
    params: { ID },
  });
}

export function updateAlarmSet(data) {
  return request({
    url: '/api/PatrolAlarmSet/UpdateAlarmSet',
    method: 'post',
    data,
  });
}

export function deleteAlarmSet(data) {
  return request({
    url: '/api/PatrolAlarmSet/DeleteAlarmSet',
    method: 'post',
    data,
  });
}

export function getAlarmDicByType() {
  return request({
    url: '/api/PatrolDic/GetPatrolDicByType?dicType=EAlarmLevel',
    method: 'get',
  });
}
