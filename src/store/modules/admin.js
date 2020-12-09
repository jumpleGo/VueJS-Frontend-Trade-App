import axios from 'axios'

const state = () => ({
  users: [],
  withdrawals: [],
  currentRoute: 'usersTable',
  settings: {},
  verificationRequests: [],
  searchedUsers: []
})

const getters = {
  users: state => state.users,
  withdrawals: state => state.withdrawals.filter(v => !v.archived),
  archivedWithdrawals: state => state.withdrawals.filter(v => v.archived),
  verificationRequests: state => state.verificationRequests.filter(v => !v.archived),
  archivedVerificationRequests: state => state.verificationRequests.filter(v => v.archived)
}

const mutations = {
  SET_CURRENT_ROUTE: (state, route) => state.currentRoute = route ,
  SET_USERS: (state, users) => state.users = users,
  SET_SEARCHED_USERS: (state, users) => state.searchedUsers = users,
  SET_WITHDRAWALS: (state, w) => state.withdrawals = w,
  SET_USERS_SETTINGS: (state, {email, object}) => {
    let user = state.users.find(u => u.email === email)
    user[Object.keys(object)[0]] = Object.values(object)[0]
  },
  SET_WITHD_STATUS: (state, {status, id}) => {
    let w = state.withdrawals.find(item => item._id === id)
    w.status = status
    w.archived = true
  },
  SET_VREQ_STATUS: (state, {status, id}) => {
    let v = state.verificationRequests.find(item => item._id === id)
    v.status = status
    v.archived = true
  },
  SET_SETTINGS: (state, s) => state.settings = s,
  SET_NEW_SETTINGS: (state, {value}) => state.settings = {...state.settings, ...value},
  SET_VERIFICATION_REQUESTS: (state, vreq) => state.verificationRequests = vreq
}

const actions = {
  SEARCH_USERS: async (context, search) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/searchUsers`,
        headers: {'Content-Type': 'application/json'},
        data: {search}
      })
      context.commit('SET_SEARCHED_USERS', res.data)
    } catch(err) {
      console.log('err', err)
    }
  },
  SET_USERS_SETTINGS: async (context, {email, object}) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setUsersSettings`,
        headers: {'Content-Type': 'application/json'},
        data: {object, email}
      })
      context.commit('SET_USERS_SETTINGS', {
        object, email
      })
    } catch(err) {
      console.log(err)
    }
  },

  SET_NEW_STATUS: async (context, {id, index, status, user, amount}) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setWithdStatus`,
        headers: {'Content-Type': 'application/json'},
        data: {index, status, id, user, amount}
      })
      context.commit('SET_WITHD_STATUS', {
        index, status, id
      })
    } catch(err) {
      console.log(err)
    }
  },
  SET_NEW_SETTINGS: async (context, {id, value}) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setNewSettings`,
        headers: {'Content-Type': 'application/json'},
        data: {id, value}
      })
      context.commit('SET_NEW_SETTINGS', {id, value})
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

  GET_PLATFORM_SETTINGS: async (context) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL_API}/platformSettings`,
        headers: {'Content-Type': 'application/json'},
      })
      
      context.commit('SET_SETTINGS', res.data)
    } catch(err)   {
      console.log(err)
    }
  },

  GET_VERIFICATION_REQUESTS: async (context) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getVerifyRequest`,
        headers: {'Content-Type': 'application/json'},
      })
      
      context.commit('SET_VERIFICATION_REQUESTS', res.data)
    } catch (err) {
      console.log(err)
    }
  },

  SET_VREQ_STATUS: async (context, data) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/setVerifyStatus`,
        headers: {'Content-Type': 'application/json'},
        data
      })
      
      context.commit('SET_VREQ_STATUS', data)
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