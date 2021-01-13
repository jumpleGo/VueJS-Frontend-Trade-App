
import axios from 'axios'

const state = () => ({
  settings: {}
})


const mutations = {
  SET_SETTINGS: (state, settings) => state.settings = settings
}

const actions = {
  GET_PLATFORM_SETTINGS: async (context) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/platformSettings`,
        headers: {'Content-Type': 'application/json'},
      })
      
      context.commit('SET_SETTINGS', res.data[0])
    } catch(err)   {
      console.log(err)
    }
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}