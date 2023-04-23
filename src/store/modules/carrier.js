const state = {
  carriers: null
}
const mutations = {
  ADD_CARRIER: (state, carriers) => {
    // state.carriers.push(carrier)
    state.carriers = carriers
  }
}
const actions = {
  addCarrier({ commit }, data) {
    commit('ADD_CARRIER', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
