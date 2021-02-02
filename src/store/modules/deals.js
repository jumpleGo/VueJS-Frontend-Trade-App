import axios from 'axios'
import { MDeal } from '@/api/models/MDeal' 
const state = () => ({
  deals: [],
  isDealOpen: false,
  currentDealPrice: 0,
  annotations: []
})

const getters = {
  deals: state => state.deals,
  isNextDealControlled: state => state.deals.slice(1,5).filter(deal => deal.status === 'WIN').length >= 3
}

const mutations = {
  ADD_DEAL: (state, {deal, currentDealPrice}) => {
    state.deals.unshift(deal),
    state.isDealOpen = true,
    state.annotations.push({
      type: "line",
      mode: "horizontal",
      display: true,
      scaleID: "y",
      borderColor: "red",
      value: +currentDealPrice,
    })
    state.annotations.push({
      type: "line",
      display: true,
      scaleID: "x",
      borderColor: "green",
      borderDash: [2, 2],
      borderDashOffset: 2,
      value: new Date(deal.startDate),
    })
    state.annotations.push({
      type: "line",
      display: true,
      scaleID: "x",
      borderColor: "red",
      borderDash: [2, 2],
      borderDashOffset: 2,
      value: new Date(deal.endDate),
    })
    state.currentDealPrice = currentDealPrice
  },
  END_DEAL: (state) => {
    state.isDealOpen = false,
    state.currentDealPrice = 0,
    state.annotations.splice(0, 3)
  },
  SET_DEALS: (state, deals) => state.deals = deals,
  UPDATE_DEAL: (state, {deal, status}) => {
    let currentDeal = state.deals.find(d => d.id === deal.id)
    currentDeal.status = status
  }
}

const actions = {
  CREATE_DEAL: async (context, deal) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/createDeal`,
        headers: {'Content-Type': 'application/json'},
        data: deal
      })
      context.commit('ADD_DEAL', {deal: new MDeal(result.data), currentDealPrice: deal.currentPrice})
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
      context.commit('END_DEAL')
      context.dispatch('trade/CLOSE_SOCKET_CONTROL_DEAL', {}, {root: true})
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