import axios from 'axios'

const state = () => ({
  deposits: [],
})

const getters = {
  deposits: state => state.deposits
}

const mutations = {
  SET_DEPOSITS: (state, d) => {
    if (d.length === 1) {
      state.deposits = d
    } else {
      state.deposits = d.reverse()
    }
  }
}

const actions = {
  GET_DEPOSITS_BY_USERID: async (context, userId) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getDeposits`,
        headers: {'Content-Type': 'application/json'},
        data: {userId}
      })

      if (result.data.length) {
        console.log("🚀 ~ file: deposit.js ~ line 26 ~ GET_DEPOSITS_BY_USERID: ~ result.data", result.data)
        context.commit('SET_DEPOSITS', result.data)
      }
    } catch (err) {
      console.log("err", err)
    }
  },

  
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}