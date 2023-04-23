import request from '@/utils/request';

// 巡检点配置
export function getPatrolLocation() {
  return request({
    url: '/api/PatrolLocation/GetPatrolLocation',
    method: 'get',
  });
}

export function getAllPatrolLocation() {
  return request({
    url: '/api/PatrolLocation/GetAllPatrolLocation',
    method: 'get',
  });
}

export function addPatrolLocation(data) {
  return request({
    url: '/api/PatrolLocation/AddPatrolLocation',
    method: 'post',
    data,
  });
}

export function deletePatrolLocation(data) {
  return request({
    url: '/api/PatrolLocation/DeletePatrolLocation?LocationID='+ data,
    method: 'post',
  });
}

export function updatePatrolLocation(data) {
  return request({
    url: '/api/PatrolLocation/UpdatePatrolLocation',
    method: 'post',
    data,
  });
}

// 巡检点操作配置
export function getAllPatrolOperate() {
  return request({
    url: '/api/PatrolOperate/GetAllPatrolOperate',
    method: 'get',
  });
}

export function getPatrolOperateByLocationID(LocationID) {
  return request({
    url: '/api/PatrolOperate/GetPatrolOperateByLocationID',
    method: 'get',
    params: {
      LocationID,
    },
  });
}

export function addPatrolOperate(data) {
  return request({
    url: '/api/PatrolOperate/AddPatrolOperate',
    method: 'post',
    data,
  });
}

export function deletePatrolOperate(data) {
  return request({
    url: '/api/PatrolOperate/DeletePatrolOperate',
    method: 'post',
    data,
  });
}

export function updatePatrolOperate(data) {
  return request({
    url: '/api/PatrolOperate/UpdatePatrolOperate',
    method: 'post',
    data,
  });
}

// 巡检计划配置
export function getPatrolPlan(PlanID) {
  return request({
    url: '/api/PatrolPlan/GetPatrolPlan',
    method: 'get',
    params: {
      PlanID,
    },
  });
}

export function getAllPatrolPlan(data) {
  return request({
    url: '/api/PatrolPlan/getAllPatrolPlan',
    method: 'post',
    data,
  });
}

export function addPatrolPlan(data) {
  return request({
    url: '/api/PatrolPlan/addPatrolPlan',
    method: 'post',
    data,
  });
}

export function deletePatrolPlan(data) {
  return request({
    url: '/api/PatrolPlan/deletePatrolPlan',
    method: 'post',
    params: data,
  });
}

export function updatePatrolPlan(data) {
  return request({
    url: '/api/PatrolPlan/updatePatrolPlan',
    method: 'post',
    data,
  });
}
//获取计划任务类型
export function getCarTypeByType() {
  return request({
    url: '/api/PatrolPlan/getPlanTypeList',
    method: 'get',
  });
}

// 巡检任务配置
export function getPatrolTemplate(TaskID) {
  return request({
    url: '/api/PatrolTemplate/GetPatrolTemplate',
    method: 'get',
    params: {
      TaskID,
    },
  });
}

export function getAllPatrolTemplate() {
  return request({
    url: '/api/PatrolTemplate/getPatrolTemplateList',
    method: 'get',
  });
}

export function getPatrolTemplateSelectList() {
  return request({
    url: '/api/PatrolTemplate/getPatrolTemplateSelectList',
    method: 'get',
  });
}

export function addPatrolTemplate(data) {
  return request({
    url: '/api/PatrolTemplate/addPatrolTemplate',
    method: 'post',
    data,
  });
}

export function deletePatrolTemplate(data) {
  return request({
    url: '/api/PatrolTemplate/deletePatrolTemplate',
    method: 'post',
    params: {
      ID: data,
    },
  });
}

export function updatePatrolTemplate(data) {
  return request({
    url: '/api/PatrolTemplate/updatePatrolTemplate',
    method: 'post',
    data,
  });
}

export function getCarrierTypeByDic() {
  return request({
    url: '/api/CarrierSet/getCarrierTypeList',
    method: 'get',
  });
}

export function getPatrolTemplates(data) {
  return request({
    url:
      '/api/PatrolTemplateItem/getPatrolTemplateItemList' +
      '?taskTemplateId=' +
      data.id,
    method: 'post',
  });
}
//任务更新
export function UpdatePatrolTemplates(data) {
  return request({
    url: '/api/PatrolTemplateItem/savePatrolTemplateItem',
    method: 'post',
    data,
  });
}

//获取计划任务频率
export function getFrequencyTypeList() {
  return request({
    url: '/api/PatrolPlan/getFrequencyTypeList',
    method: 'get',
  });
}

//获取计划任务是否启用
export function getPlanEnableList() {
  return request({
    url: '/api/PatrolPlan/getPlanEnableList',
    method: 'get',
  });
}

//获取计划任务是否启用
export function getExecuteTypeList() {
  return request({
    url: '/api/PatrolPlan/getExecuteTypeList',
    method: 'get',
  });
}

//任务更新
export function startPatrolPlan(id,exit) {
  return request({
    url: '/api/PatrolPlan/startPatrolPlan?ID=' + id + '&exit=' + exit,
    method: 'post',
  });
}

//暂停任务
export function stopPatrolPlan(id) {
  return request({
    url: '/api/PatrolPlan/stopPatrolPlan?ID=' + id,
    method: 'post',
  });
}
