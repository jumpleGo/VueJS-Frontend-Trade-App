import axios from 'axios'
const state = () => ({
  deals: []
})

const getters = {

}

const mutations = {
  SET_DEAL: (state, deal) => {
    state.deals.unshift(deal)
  }
}

const actions = {
  CREATE_DEAL: async (context, deal) => {
    console.log("deal", deal)
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/createDeal`,
        headers: {'Content-Type': 'application/json'},
        data: deal
      })
      console.log("result", result)
      if (result.status === 200) {
        context.commit('SET_DEAL', deal)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}