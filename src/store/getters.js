const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // token
  account: (state) => state.user.account, // �˺�
  name: (state) => state.user.name, // ����
  role: (state) => state.user.role, // ��ɫ
  roles: (state) => state.user.roles, // Ȩ���б�
  permission_routes: (state) => state.permission.routes,
  language: (state) => state.app.language,
  webSocketUrl: (state) => state.user.webSocketUrl,
  realTimeTasks: (state) => state.global.realTimeTasks,
  planTasks: (state) => state.global.planTasks,
  realTimeAlarm:(state) => state.global.realTimeAlarm,
  logoutState: (state) => state.global.logoutState,
  cameraOut: (state) =>state.global.cameraOut,
  carrierSelectedIp:(state)=>state.global.carrierSelectedIp,
  locationTips:(state)=>state.global.locationTips,
  locationFail:(state)=>state.global.locationFail,
  locationBoolen:(state)=>state.global.locationBoolen,
}; 
export default getters;
