const state = {
  realTimeTasks: [],
  planTasks: [],
  realTimeAlarm:[],
  logoutState:[],
  cameraOut:[],
  carrierSelectedIp:'111',
  locationTips:'小提示',
  locationFail:false,
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
  },
  setLocationAlarm:(state)=>{
    state.locationFail = !state.locationFail
  }

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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
