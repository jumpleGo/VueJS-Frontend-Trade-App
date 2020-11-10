import { MUser } from '@/api/models/MUser'
import axios from 'axios'

const state = () => ({
  currentUser: {}
})

const getters = {

}

const mutations = {
  REDUCE_USER_BALANCE: (state, amount) => state.currentUser.balance -= amount,
  ENLARGE_USER_BALANCE: (state, amount) => state.currentUser.balance += amount,
  SET_CURRENT_USER: (state, user) => state.currentUser = new MUser(user),
  DELETE_CURRENT_USER: state => state.currentUser = null,
}

const actions = {
  UPDATE_USER_BALANCE: async (context, {amount, type}) => {
    await axios({
      method: 'post',
      url: `${process.env.VUE_APP_SERVER_URL_API}/updateBalance`,
      headers: {'Content-Type': 'application/json'},
      data: {
        email: context.state.currentUser.email,
        amount,
        type
      }
    })
    if (type === 'minus') {
      context.commit('REDUCE_USER_BALANCE', amount)
    }
    if (type === 'plus') {
      context.commit('ENLARGE_USER_BALANCE', amount)
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