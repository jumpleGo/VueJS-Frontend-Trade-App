import axios from 'axios'
const state = () => ({
  partner: null,
  referrals: [],
  platformPartners: []
})

const getters = {

}

const mutations = {
  SET_PARTNER: (state, partner) => state.partner = partner,
  SET_REFERRALS: (state, referrals) => state.referrals = referrals,
  SET_PARTNERS: (state, partners) => state.platformPartners = partners,
  SET_PERCENT_TO_PARTNER: (state, {id, percent}) => {
    let partner = state.platformPartners.find(p => p._id === id)
    partner.percent = percent
  }
}

const actions = {
  SET_PERCENT_TO_PARTNER: async (context, partner) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setPercentToPartner`,
        headers: {'Content-Type': 'application/json'},
        data: {id: partner._id, percent: +partner.percent}
      })
      if (result.status === 200) {
        context.commit('SET_PERCENT_TO_PARTNER', {id: partner._id, percent: +partner.percent})
      }
    } catch (err) {
      console.log(err)
    }
  },

  GET_PARTNERS: async (context) => {
    try {
      const result = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getPartners`,
        headers: {'Content-Type': 'application/json'},
      })
      if (result.status === 200) {
        context.commit('SET_PARTNERS', result.data)
      }
    } catch (err) {
      console.log(err)
    }
  },
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