import axios from 'axios'
const state = () => ({
  promocodes: []
})

const getters = {
  
}

const mutations = {
  SET_PROMOCODES: (state, promocodes) => {
    state.promocodes = promocodes
  }
}

const actions = {
  EDIT_PROMOCODE: async (context, {id, edit}) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setPercentToPartner`,
        headers: {'Content-Type': 'application/json'},
        data: {id, edit}
      })
      if (result.status === 200) {
        context.commit('EDIT_PROMOCODE', {id, edit})
      }
    } catch (err) {
      console.log(err)
    }
  },

  GET_PROMOCODES: async (context) => {
    try {
      const result = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getPromocodes`,
        headers: {'Content-Type': 'application/json'},
      })
      if (result.status === 200) {
        context.commit('SET_PROMOCODES', result.data)
      }
    } catch (err) {
      console.log(err)
    }
  },

  CREATE_PROMOCODE: async (context, {count, minDeposit, bonus}) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/createPromocodes`,
        headers: {'Content-Type': 'application/json'},
        data: {count, minDeposit, bonus}
      })
      if (result.status === 200) {
        context.dispatch('GET_PROMOCODES')
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