import { MUser } from '@/api/models/MUser'
import axios from 'axios'

const state = () => ({
  currentUser: {}
})

const getters = {
  MODE_BALANCE: state => state.currentUser.demoBalance > 0 ? 'demoBalance' : 'balance'
}

const mutations = {
  REDUCE_USER_BALANCE: (state, {amount, mode}) => state.currentUser[mode] -= amount,
  ENLARGE_USER_BALANCE: (state, {amount, mode}) => state.currentUser[mode] += amount,
  SET_CURRENT_USER: (state, user) => state.currentUser = new MUser(user),
  DELETE_CURRENT_USER: state => state.currentUser = null,
}

const actions = {
  UPDATE_USER_BALANCE: async (context, {amount, type, mode}) => {
    await axios({
      method: 'post',
      url: `${process.env.VUE_APP_SERVER_URL_API}/updateBalance`,
      headers: {'Content-Type': 'application/json'},
      data: {
        email: context.state.currentUser.email,
        amount,
        type,
        mode
      }
    })
    if (type === 'minus') {
      context.commit('REDUCE_USER_BALANCE', {amount, mode})
    }
    if (type === 'plus') {
      context.commit('ENLARGE_USER_BALANCE', {amount, mode})
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