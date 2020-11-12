import axios from 'axios'
import { MDeal } from '@/api/models/MDeal' 
const state = () => ({
  deals: []
})

const getters = {
  deals: state => state.deals
}

const mutations = {
  ADD_DEAL: (state, deal) => state.deals.push(deal),
  SET_DEALS: (state, deals) => state.deals = deals.reverse(),
  UPDATE_DEAL: (state, {deal, status}) => {
    let currentDeal = state.deals.find(d => d.id === deal.id)
    currentDeal.status = status
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
      if (result.status === 200) {
        context.commit('ADD_DEAL', new MDeal(result.data))
      }
    } catch (err) {
      console.log(err)
    }
  },

  GET_DEALS_BY_USERID: async (context, userId) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getDeals`,
        headers: {'Content-Type': 'application/json'},
        data: {userId}
      })

      if (result.data.length) {
        const deals = result.data.map(deal => new MDeal(deal))
        context.commit('SET_DEALS', deals)
      }
    } catch (err) {
      console.log("err", err)
    }
  },

  CLOSE_DEAL: async (context, {deal, price}) => {
    try {
      const status = await context.dispatch('UPDATE_DEAL_STATUS', {deal, price})

      context.commit('UPDATE_DEAL', {deal, status})
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/updateDeal`,
        headers: {'Content-Type': 'application/json'},
        data: {id: deal.id, status}
      })
    } catch (err) {
      console.log(err)
    }
  },
  UPDATE_DEAL_STATUS: async (context, {deal, price}) => {
    console.log("deal, price", deal, price)
    if ((deal.currentPrice < price && deal.trend === 'high') || (deal.currentPrice > price && deal.trend === 'low')) {
      await context.dispatch('user/UPDATE_USER_BALANCE', {
        amount: deal.amount * 1.8,
        type: 'plus'
      },
      {root: true})
      return 'WIN'
    } else if (deal.currentPrice === price) {
      await context.dispatch('user/UPDATE_USER_BALANCE', {
        amount: deal.amount,
        type: 'plus'
      }, {root: true})
      return 'RETURN'
    } else {
      return 'LOSE'
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