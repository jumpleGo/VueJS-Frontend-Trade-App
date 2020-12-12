import axios from 'axios'
const state = () => ({
  partner: null,
  referrals: [],
  depositTable: {}
})

const getters = {
  depositTable: state => (id) => state.depositTable[id]
}

const mutations = {
  SET_PARTNER: (state, partner) => state.partner = partner,
  SET_REFERRALS: (state, referrals) => state.referrals = referrals
}

const actions = {
  GET_MY_PARTNER: async (context, userId) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getPartnerByUser`,
        headers: {'Content-Type': 'application/json'},
        data: {userId}
      })
      if (result.status === 200) {
        context.commit('SET_PARTNER', result.data)
      }
    } catch (err) {
      console.log(err)
    }
  },

  GET_MY_REFERRALS: async (context, userId) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getReferralsByUser`,
        headers: {'Content-Type': 'application/json'},
        data: {userId}
      })
      if (result.status === 200) {
        context.commit('SET_REFERRALS', result.data)
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