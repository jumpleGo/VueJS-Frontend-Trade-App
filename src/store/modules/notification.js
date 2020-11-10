
const state = () => ({
  settings: {
    time: 0,
    text: null,
    show: false
  }
})

const getters = {

}

const mutations = {
  SET_NOTIFICATION_SETTINGS: (state, settings) => {
    console.log("settings", settings)
    state.settings = {...state.settings, ...settings}
  }
}

const actions = {
  SET_NOTIFICATION_SETTINGS: (context, settings) => {
    context.commit('SET_NOTIFICATION_SETTINGS', settings)
    setTimeout(() => {
      context.commit('SET_NOTIFICATION_SETTINGS', {show: false, time: 0, text: null})
    }, settings.time)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}