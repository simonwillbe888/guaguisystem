import request from '@/utils/request';

export function getAllCarrierStaticsInfo(start_time, end_time) {
  return request({
    url: '/api/Statics/GetAllCarrierStaticsInfo',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getCarrierIdleDetail(carId, start_time, end_time) {
  return request({
    url: '/api/Statics/GetCarrierIdleDetail',
    method: 'get',
    params: {
      carrierID: carId,
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getCarrierChargeDetail(carId, start_time, end_time) {
  return request({
    url: '/api/Statics/GetCarrierChargeDetail',
    method: 'get',
    params: {
      carrierID: carId,
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getPatrolPlanStatistics(startTime, endTime) {
  return request({
    url: '/api/PatrolStatistics/GetPatrolPlanStatistics',
    method: 'get',
    params: {
      Starttime: startTime,
      EndTime: endTime,
    },
  });
}

export function getCarrierTaskStatistics(startTime, endTime) {
  return request({
    url: '/api/PatrolStatistics/GetCarrierTaskStatistics',
    method: 'get',
    params: {
      Starttime: startTime,
      EndTime: endTime,
    },
  });
}

export function getTaskStatistics(startTime, endTime) {
  return request({
    url: '/api/PatrolStatistics/GetTaskStatistics',
    method: 'get',
    params: {
      Starttime: startTime,
      EndTime: endTime,
    },
  });
}

export function getCurrentAlarm() {
  return request({
    url: '/api/Statics/GetCurrentAlarm',
    method: 'get',
  });
}

export function getAllIdleStaticsTotal(start_time, end_time) {
  return request({
    url: '/api/Statics/GetAllCarrierIdleTotalTime',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getIdleStaticsTotalByCarrier(carrier, start_time, end_time) {
  return request({
    url: '/api/Statics/GetCarrierIdleTotalTime',
    method: 'get',
    params: {
      carrierID: carrier,
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getIdleStaticsDetail(carrier, start_time, end_time) {
  return request({
    url: '/api/Statics/GetCarrierIdleDetail',
    method: 'get',
    params: {
      carrierID: carrier,
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getAllIdleStaticsDetail(start_time, end_time) {
  return request({
    url: '/api/Statics/GetAllCarrierIdleDetail',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getAllChargeStaticsTotal(start_time, end_time) {
  return request({
    url: '/api/Statics/GetAllCarrierChargeTotalTime',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getChargeStaticsTotalByCarrier(carrier, start_time, end_time) {
  return request({
    url: '/api/Statics/GetCarrierChargeTotalTime',
    method: 'get',
    params: {
      carrierID: carrier,
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getAllChargeStaticsDetail(start_time, end_time) {
  return request({
    url: '/api/Statics/GetAllCarrierChargeDetail',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getChargeStaticsDetailByCarrier(carrier, start_time, end_time) {
  return request({
    url: '/api/Statics/GetCarrierChargeDetail',
    method: 'get',
    params: {
      carrierID: carrier,
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getUtilizationTrendData(start_time, end_time) {
  return request({
    url: '/api/Statics/GetAllCarrierUtilizationTrendTotalTime',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getFaultRate(start_time, end_time) {
  return request({
    url: '/api/Statics/GetFaultRate',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}

export function getFaultRateTrend(start_time, end_time) {
  return request({
    url: '/api/Statics/GetFaultRateTrend',
    method: 'get',
    params: {
      startTime: start_time,
      endTime: end_time,
    },
  });
}
