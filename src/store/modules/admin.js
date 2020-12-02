import axios from 'axios'

const state = () => ({
  users: [],
  withdrawals: [],
  currentRoute: 'usersTable'
})

const getters = {
  users: state => state.users
}

const mutations = {
  SET_CURRENT_ROUTE: (state, route) => {
    console.log("🚀 ~ file: admin.js ~ line 15 ~ route", route)
    state.currentRoute = route   
  },
  SET_USERS: (state, users) => {
    state.users = users
  },
  SET_WITHDRAWALS: (state, w) => {
    state.withdrawals = w
  },
  SET_USERS_SETTINGS: (state, {index, isAdmin, isBlocked}) => {
    let user = state.users[index]
    user.isAdmin = isAdmin
    user.isBlocked = isBlocked 
  },
  SET_WITHD_STATUS: (state, {index, status}) => {
    let w = state.withdrawals[index]
    w.status = status
  }
}

const actions = {
  SET_USERS_SETTINGS: async (context, {index, isAdmin, isBlocked, email}) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setUsersSettings`,
        headers: {'Content-Type': 'application/json'},
        data: {isAdmin, isBlocked, email}
      })
      context.commit('SET_USERS_SETTINGS', {
        isAdmin, isBlocked, index
      })
    } catch(err) {
      console.log(err)
    }
  },

  SET_NEW_STATUS: async (context, {id, index, status}) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setWithdStatus`,
        headers: {'Content-Type': 'application/json'},
        data: {index, status, id}
      })
      context.commit('SET_WITHD_STATUS', {
        index, status
      })
    } catch(err) {
      console.log(err)
    }
  },
  GET_USERS: async (context) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/users`,
        headers: {'Content-Type': 'application/json'},
      })
      context.commit('SET_USERS', res.data)
    } catch(err) {
      console.log(err)
    }
  },

  GET_WITHDRAWALS: async (context) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/withdrawals`,
        headers: {'Content-Type': 'application/json'},
      })
      
      context.commit('SET_WITHDRAWALS', res.data.reverse())
    } catch(err)   {
      console.log(err)
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