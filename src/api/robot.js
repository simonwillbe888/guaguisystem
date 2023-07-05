import request from '@/utils/request';
import { request2 } from '../utils/request2';
// 手摇操作
export function connectCar(on,nowtime){
  return  request2({
    url: '/api/Vcu/CarrierMoveSwitch?Switch='+ on +'&SendTime=' + nowtime,
    method:'post',
    data:{}
  })
}

export function GetMonitorData(){
  return  request2({
    url: '/api/vcu/GetMonitorData',
    method:'get',
    data:{},
  })
}

export function moveCar(Direct,Speed,Span,SendTime){
  return request2({
    url:'/api/Vcu/Move?Direct=' + Direct +'&Speed=' +Speed + 
    '&Span='+ Span +'&SendTime=' +SendTime,
    method:'post',
    data:{},
  })
}

export function stopCar(time){
  return request2({
    url:'/api/Vcu/StopAGV?SendTime=' + time,
    method:'post',
    data:{},
  })
}

export function getRtsp(id){
  return request({
    url:'/api/CarrierAccessory/GetCarrierAccessoryRTSP?carrierID='+id,
    method:'get',

  })
}
export function startWarningLight(id){
  return request({
    url:'/api/CarrierSet/startWarningLight?carrierID='+id,
    method:'get',
  })
}
export function stopWarningLight(id){
  return request({
    url:'/api/CarrierSet/stopWarningLight?carrierID='+id,
    method:'get',
  })
}
export function CancelCarrierControl(id){
  return request({
    url:'/api/PatrolPlan/CancelCarrierControl?carrierID='+id,
    method:'get',

  })
}
export function getTaskRemainingMileage(id){
  return request({
    url:'/api/PatrolPlan/getTaskRemainingMileage?taskID='+id,
    method:'get',

  })
}
export function SetSpeed(data){
  return request({
    url:'/api/CarrierGroup/SetSpeed',
    method:'post',
    data

  })
}
//通知遥控
export function informOpenRobot(data) {
  return request({
    url: '/api/CarrierSet/startCarrierRemoteControl?carrierID=' + data,
    method: 'post',
    data:{}
  });
}
export function informCloseRobot(data) {
  return request({
    url: '/api/CarrierSet/closeCarrierRemoteControl?carrierID=' + data,
    method: 'post',
    data:{}
  });
}


// 机器人配置
export function getCarrierList(data) {
  return request({
    url: '/api/CarrierSet/getCarrierList',
    method: 'post',
    data
  });
}

export function getIndexCar(){
  return request ({
    url: '/api/AlarmData/getCarrierList',
    method: 'post',
    data:{}
  })
}

export function addCarrier(data) {
  return request({
    url: '/api/CarrierSet/addCarrier',
    method: 'post',
    data,
  });
}

export function deleteCarrier(data) {
  return request({
    url: '/api/CarrierSet/deleteCarrier?ID=' + data,
    method: 'post',
    data:{},
  });
}

export function updateCarrier(data) {
  return request({
    url: '/api/CarrierSet/updateCarrier',
    method: 'post',
    data,
  });
}

export function getAccessoType() {
  return request({
    url: '/api/Accessory/getAccessoryTypeList',
    method: 'get',
  });
}

export function getAccessoriesByType(typeId) {
  return request({
    url: '/api/Accessory/getAccessoryListByType?accessoryType=' + typeId,
    method: 'post',
  });
}

export function getAccessoFeatureType() {
  return request({
    url: '/api/CarrierSet/getActionTypeList',
    method: 'get',
  });
}

export function getAccessoList() {
  return request({
    url: '/api/Accessory/GetList',
    method: 'get',
  });
}

export function addAccessory(data) {
  return request({
    url: '/api/CarrierAccessories/AddAccessory',
    method: 'post',
    data,
  });
}

export function saveAccessory(data) {
  return request({
    url: '/api/CarrierAccessory/SaveCarrierAccessory',
    method: 'post',
    data,
  });
}

export function deleteAccessory(data) {
  return request({
    url: '/api/CarrierAccessories/DeleteAccessory',
    method: 'post',
    data,
  });
}

export function getAccessory(carId) {
  return request({
    url: '/api/CarrierAccessory/GetCarrierAccessoryList?carrierID='+ carId,
    method: 'post',
   
  });
}
//语音播报
export function startVoiceBroadcast(data) {
  return request({
    url: '/api/CarrierSet/startVoiceBroadcast',
    method: 'post',
    data:data
  });
}
export function stopVoiceBroadcast(data) {
  return request({
    url: '/api/CarrierSet/stopVoiceBroadcast?carrierID=' + data,
    method: 'get',
  });
}
//系统监控 设备列表
export function getEquipmentList(data) {
  return request({
    url: '/api/Area/SearchArea',
    method: 'post',
    data,
  });
}

//小车列表
export function getAllCarrierDetailInfo() {
  return request({
    url: '/api/CarrierGroup/GetAllCarrierDetailInfo',
    method: 'get',
  });
}
//小车开关
export function setRemoteSwitch(data) {
  return request({
    url: '/api/CarrierGroup/RemoteSwitch',
    method: 'post',
    data,
  });
}

//小车移动
export function robotMoveCrl(data) {
  return request({
    url: '/api/CarrierGroup/RemoteControl',
    method: 'post',
    data,
  });
}

//小车停止
export function robotStop(data) {
  return request({
    url: '/api/CarrierGroup/RemoteStop',
    method: 'post',
    data,
  });
}
//云台
// export function setDeviceOperate(data) {
//   return request({
//     url: '/api/HKControl/HKDeviceOperate',
//     method: 'post',
//     data,
//   });
// }

//获取硬盘录像机列表
export function getVideoRecordList(data) {
  return request({
    url: '/api/DVR/GetList',
    method: 'post',
    data,
  });
}
//新增硬盘录像机配置
export function addVideoRecorder(data) {
  return request({
    url: '/api/DVR/Insert',
    method: 'post',
    data,
  });
}

//更新硬盘录像机配置
export function updateVideoRecorder(data) {
  return request({
    url: '/api/DVR/Update',
    method: 'post',
    data,
  });
}
//删除硬盘录像机配置
export function delVideoRecordList(data) {
  return request({
    url: '/api/DVR/Delete',
    method: 'post',
    params: data,
  });
}

//获取摄像头集合信息
export function getCameraList() {
  return request({
    url: '/api/DVR/GetDVRBrandList',
    method: 'get',
  });
}

//获取摄像头集合信息
export function getSysCameraes() {
  return request({
    url: '/api/DVR/GetCameraList',
    method: 'get',
  });
}
//添加关联
export function updateDetails(data) {
  return request({
    url: '/api/DVR/UpdateDetails',
    method: 'post',
    data: data,
  });
}

//添加录音文件
export function startBroadcast(data) {
  return request({
    url: '/api/HKControl/voiceCall',
    method: 'post',
    data: data,
  });
}
//移动到指定巡检点

export function moveToPatrolPoint(data) {
  return request({
    url: '/api/PatrolPlan/moveToPatrolPoint',
    method: 'post',
    data: data,
  });
}
export function getChargingStateByCarrierID(data) {
  return request({
    url: '/api/CarrierSet/getChargingStateByCarrierID?carrierID=' + data,
    method: 'get',
  });
}
//开启广播
// export function openBroadcast(data) {
//   return request({
//     url: '/api/HKControl/Login',
//     method: 'post',
//     data: data,
//   });
// }

// 连接登录摄像头
export function login(data) {
  return request({
    url: '/api/HKControl/Login',
    method: 'post',
    data: data,
  });
}
//结束登录
export function logOut(id) {
  return request({
    url: '/api/HKControl/LoginOut?accessoryID=' + id,
    method: 'get',
    data: {},
  });
}
//红外测温
export function getTemperature(data) {
  return request({
    url: '/api/HKControl/getTemperature',
    method: 'post',
    data: data,
  });
}
