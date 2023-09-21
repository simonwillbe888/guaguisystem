const state = {
  realTimeTasks: [],
  planTasks: [],
  realTimeAlarm:[],
  logoutState:[], //登出
  cameraOut:[],
  carrierSelectedIp:'111',
  locationTips:'小提示',
  locationFail:false,
  locationBoolen:false,
  closeAll:false,
  closeBroadcast:false,
  clostSpeak:false,
  closeWarnL:false,
  dealwithAlarm:false,
  areaId:0,
  fileAddress:'',
  theme:'theme-1'
};

const mutations = {
  SET_REAL_TIME_TASKS: (state, realTimeTasks) => {
    state.realTimeTasks = realTimeTasks;
},
  SET_PlAN_TASKS: (state, planTasks) => {
    state.planTasks = planTasks;
  },
  SET_REAL_TIME_ALARM:(state,realTimeAlarm)=>{
    state.realTimeAlarm = realTimeAlarm
  },
  SET_logtouState:(state,logoutState)=>{
    state.logoutState = logoutState
  },
  SET_cameraOut:(state, cameraOut)=>{
    state.cameraOut = cameraOut
  },
  setIp:(state,data)=>{
    state.carrierSelectedIp = data
  },
  setLocationTips:(state,data)=>{
   state.locationTips = data
   if(data.includes('机器人到达')){
    state.locationBoolen = !state.locationBoolen
   }
  },
  setLocationAlarm:(state)=>{
    state.locationFail = !state.locationFail
  },
  setClose:(state)=>{
     state.closeAll = !state.closeAll
  },
  setBroadcast:()=>{
    state.closeBroadcast = !state.closeBroadcast
  },
  setSpeak:()=>{
    state.clostSpeak = !state.clostSpeak
  },
  setWarn:()=>{
    state.closeWarnL = !state.closeWarnL
  },
  set_DealwithAlarm:()=>{
    state.dealwithAlarm = !state.dealwithAlarm
  },
  set_areaId:(state,data)=>{
    state.areaId = data
  },
  set_fileAddress:(state,data)=>{
    state.fileAddress = data
  },
  set_theme:(state,data)=>{
    if(data){
      state.theme = 'theme-1'
    }else {
      state.theme = 'theme-2'
    }
  },
};

const actions = {
  getIp({commit},carrierSelectedIp){
    commit('setIp',carrierSelectedIp)
  },
  setLocation({commit},locationTips){
    commit('setLocationTips',locationTips)
  },
  setLocationFail({commit},locationFail){
    commit('setLocationAlarm',locationFail)
  },
  setRealTimeTasks({ commit }, realTimeTasks) {
    commit('SET_REAL_TIME_TASKS', realTimeTasks);
  },
  setPlanTasks({ commit }, planTasks) {
    commit('SET_PlAN_TASKS', planTasks);
  },
  setRealTimeAlarm({commit},realTimeAlarm){
    commit('SET_REAL_TIME_ALARM',realTimeAlarm)
  },
  setlogoutState({commit},logoutState){
    commit('SET_logtouState',logoutState)
  },
  setcameraOut({commit},cameraOut){
    commit('SET_cameraOut',cameraOut)
  },
  setCloseAll({commit},data){
    commit('setClose',data)
  },
  setcloseBroadcast({commit},data){
    commit('setBroadcast',data)
  },
  setCloseSpeak({commit},data){
    commit('setSpeak',data)
  },
  setWarnLight({commit},data){
    commit('setWarn',data)
  },
  setDeaiwithAlarm({commit},data){
    commit('set_DealwithAlarm',data)
  },
  setAreaId({commit},data){
    commit('set_areaId',data)
  },
  setFileAddress({commit},data){
    commit('set_fileAddress',data)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
