import axios from 'axios'
import { MWithd } from '@/api/models/MWithd' 
const state = () => ({
  withdrawals: [],
  minLengthWithdrawal: null
})

const getters = {
  withdrawals: state => state.withdrawals
}

const mutations = {
  SET_MIN_LENGTH_NUMBER: (state, num) => state.minLengthWithdrawal = num,
  ADD_WITHDRAWAL: (state, w) => state.withdrawals.unshift(w),
  SET_WITHDRAWALS: (state, w) => state.withdrawals = w.reverse(),
}

const actions = {
  CREATE_REQUEST: async (context, request) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/createWithdrawal`,
        headers: {'Content-Type': 'application/json'},
        data: request
      })
      await context.dispatch('user/UPDATE_USER_BALANCE', {amount: request.amount, type: 'minus'}, {root: true})
      if (result.status === 200) {
        context.commit('ADD_WITHDRAWAL', new MWithd(result.data))
      }
    } catch (err) {
      console.log(err)
    }
  },

  GET_WITHDRAWALS_BY_USERID: async (context, userId) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getWithdrawals`,
        headers: {'Content-Type': 'application/json'},
        data: {userId}
      })

      if (result.data.length) {
        const withdrawals = result.data.map(w => new MWithd(w))
        context.commit('SET_WITHDRAWALS', withdrawals)
      }
    } catch (err) {
      console.log("err", err)
    }
  },

  GET_MIN_LENGTH_NUMBER: async (context) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/platformSettings`,
        headers: {'Content-Type': 'application/json'},
      })
      
      context.commit('SET_MIN_LENGTH_NUMBER', res.data[0].minAmount)
    } catch(err)   {
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