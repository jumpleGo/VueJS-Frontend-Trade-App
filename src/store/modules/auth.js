import router from '@/router'
import axios from 'axios'
import { MUser } from '@/api/models/MUser'

const state = () => ({
  currentUser: null,
  loginError: null,
  registrationError: null,
  resetError: null
})

const getters = {

}

const mutations = {
  SET_CURRENT_USER: (state, user) => state.currentUser = new MUser(JSON.parse(user)),
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
        const {token, user} = result.data

        localStorage.setItem('tradingBTCToken', token)
        localStorage.setItem('currentUser', JSON.stringify(user))

        context.commit('SET_CURRENT_USER', user)
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
  },

  CHECK_AUTH: (context) => {
    const currentUser = localStorage.getItem('currentUser')

    if (currentUser) {
      context.commit('SET_CURRENT_USER', currentUser)
    }else {
      const token = localStorage.getItem('tradingBTCToken')
      if (token) {
        localStorage.removeItem('tradingBTCToken')
        context.dispatch('notification/SET_NOTIFICATION_SETTINGS',
          {
            show: true,
            time: 2000,
            text: 'Системная ошибка, Войдите еще раз'
          }, 
          { root: true }
        )
        router.push('/login')
      }
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