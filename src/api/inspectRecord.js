import request from '@/utils/request';

// 巡检记录配置
export function getList(StartTime, EndTime) {
  return request({
    url: '/api/PatrolData/GetList',
    method: 'get',
    params: {
      StartTime,
      EndTime,
    },
  });
}
// 获取云台文件视频
export function GetPTZFile(data) {
  return request({
    url: '/api/HKControl/GetPTZFile',
    method: 'POST',
    data:data,
  });
}
//下载云台文件
export function downLoadPTZFile(data) {
  return request({
    url: '/api/HKControl/downLoadPTZFile?ID=' + data,
    method: 'GET',
    responseType: "blob"
    
  });
}
// 获取巡检文件视频
export function getPatrolFileList(data) {
  return request({
    url: '/api/PatrolFile/getPatrolFileList',
    method: 'POST',
    data:data,
  });
}

//下载单个视频
export function GetVideoData(id) {
  return request({
    url: '/api/PatrolFile/GetVideoData?fileID='+ id,
    responseType:'blob',
    method: 'Get',
    data:{},
  });
}
//下载单个照片
export function GetPhotoData(id) {
  return request({
    url: '/api/PatrolFile/GetPhotoData?fileID='+ id,
    responseType:'blob',
    method: 'Get',
    data:{},
  });
}
// 巡检数据--详情
export function getAlarmListByPatrolRecordID(id) {
  return request({
    url: '/api/PatrolRecord/getAlarmListByPatrolRecordID?PatrolRecordID='+ id,
    method: 'Get',
    data:{},
  });
}
export function exportExcel(data){
  return request({
    url:'/api/AlarmRecord/currentAlarmRecordExportExcel',
    responseType:'blob',
    method:'post',
    data,
  })
}
export function exportHistoryExcel(data){
  return request({
    url:'/api/AlarmRecord/historyAlarmRecordExportExcel',
    responseType:'blob',
    method:'post',
    data,
  })
}
export function patrolRecordExportExcel(data){
  return request({
    url:'/api/PatrolRecord/patrolRecordExportExcel',
    responseType:'blob',
    method:'post',
    data,
  })
}
export function exportRecord(data){
  return request({
    url:'/api/SystemLog/systemLogExportExcel',
    responseType:'blob',
    method:'post',
    data,
  })
}
export function getDataRecord (data){
  return request({
    url:'/api/SystemLog/getSystemLogList',
    method:'post',
    data,
  })
}
export function getPageList(data) {
  return request({
    url: '/api/PatrolRecord/getPatrolRecordList',
    method: 'post',
    data,
  });
}
// 实时告警列表
export function getCurrentAlarmRecordList(data) {
  return request({
    url: '/api/AlarmRecord/getCurrentAlarmRecordList',
    method: 'post',
    data,
  });
}
// 告警状态
export function getAlarmStateList() {
  return request({
    url: '/api/AlarmRecord/getAlarmStateList',
    method: 'get',
  });
}
// 全部告警列表
export function getAlarmRecordList(data) {
  return request({
    url: '/api/AlarmRecord/getAlarmRecordList',
    method: 'post',
    data,
  });
}
// 告警处理
export function dealAlarm(data) {
  return request({
    url: '/api/AlarmRecord/dealAlarm',
    method: 'post',
    data,
  });
}
// 告警日志
export function getAlarmDealLog(data) {
  return request({
    url: '/api/AlarmRecord/getAlarmDealLog',
    method: 'post',
    params: data,
  });
}

//实时任务
export function getRealPatrolTaskList() {
  return request({
    url: '/api/PatrolTask/GetRealPatrolTaskList',
    method: 'get',
  });
}
export function GetRealPatrolTaskByCarrierId(id) {
  return request({
    url: '/api/PatrolTask/GetRealPatrolTaskByCarrierId?carrierId='+ id,
    method: 'get',
  });
}
//取消任务
export function cancelPatrolTask(data) {
  return request({
    url: '/api/PatrolTask/CancelPatrolTask',
    method: 'post',
    data,
  });
}

//实时任务
export function getTaskTypeList() {
  return request({
    url: '/api/PatrolRecord/getPatrolActionTypeList',
    method: 'get',
  });
}
