import router from '@/router'
import axios from 'axios'

const state = () => ({
  currentUser: null,
  loginError: null,
  registrationError: null,
  resetError: null
})

const getters = {

}

const mutations = {
  SET_CURRENT_USER: (state, user) => state.currentUser = user,
  SET_REGISTER_ERROR: (state, error) => state.registrationError = error,
  DELETE_CURRENT_USER: state => state.currentUser = null,
  SET_LOGIN_ERROR: (state, error) => state.loginError = error,
  SET_RESET_ERROR: (state, error) => state.resetError = error
}

const actions = {
  LOGIN: async (context, data) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/login`,
        headers: {'Content-Type': 'application/json'},
        data: data
      })

      if (!result.data.error) {
        const token = result.data.token
        localStorage.setItem('tradingBTCToken', token)
        context.commit('SET_CURRENT_USER', result.data.user)
        router.push('/dashboard')
      } else {
        context.commit('SET_LOGIN_ERROR', {code: 'wrong_pass'}) 
      }
    } catch (err) {
      localStorage.removeItem('tradingBTCToken')
      context.commit('SET_LOGIN_ERROR', {code: 'notFoundUser'}) 
    }
  },

  LOGOUT: ({commit}) =>  {
    localStorage.removeItem('tradingBTCToken')
    commit('DELETE_CURRENT_USER')
    router.push('/login')
  },
  REGISTER: async (context, data) => {

    const res = await axios({
      method: 'post',
      url: `${process.env.VUE_APP_SERVER_URL_API}/register`,
      headers: {'Content-Type': 'application/json'},
      data: data
    }).catch(() => {
      context.commit('SET_REGISTER_ERROR', 'already_used')
    })

    if (res?.status === 200) {
      context.dispatch('LOGIN', data)
    }
  },

  RESET: async (context, email) => {
    console.log("email", email)
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/reset`,
        headers: {'Content-Type': 'application/json'},
        data: email
      })
      console.log("res", res)

      let { error } = res.data
      if (error) {
        context.commit('SET_RESET_ERROR', error)
      } else {
        context.dispatch('notification/SET_NOTIFICATION_SETTINGS',
          {
            show: true,
            time: 2000,
            text: 'Новый пароль отправлен Вам на почту'
          }, 
          { root: true }
        )
        router.push('/login')
      }
    } catch(error){
      console.log("error", error)
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