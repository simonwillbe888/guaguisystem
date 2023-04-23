import request from '@/utils/request';

// 区域列表
export function getAreaList(data) {
  return request({
    url: '/api/Area/GetAreaList',
    method: 'post',
    data,
  });
}
// 区域下拉列表
export function getArea(data) {
  return request({
    url: '/api/Area/GetArea',
    method: 'post',
    data,
  });
}
// 区域新增
export function getAddArea(data) {
  return request({
    url: '/api/Area/AddArea',
    method: 'post',
    data,
  });
}
// 获取地图数据待命点
export function GetMapData(){
  return request({
    url:'/api/Map/GetMapData',
    method:"GET",
    data:{}
  })
}
// 区域修改
export function getUpdateArea(data) {
  return request({
    url: '/api/Area/UpdateArea',
    method: 'post',
    data,
  });
}
// 区域删除
export function getDeleteArea(data) {
  return request({
    url: '/api/Area/DeleteArea',
    method: 'post',
    params: data,
  });
}
