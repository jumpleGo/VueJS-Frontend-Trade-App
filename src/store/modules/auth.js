import router from '@/router'
import axios from 'axios'

const state = () => ({
  loginError: null,
  registrationError: null,
  resetError: null
})

const getters = {

}

const mutations = {
  SET_REGISTER_ERROR: (state, error) => state.registrationError = error,
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
        
        if (user.isBlocked){
          context.dispatch('notification/SET_NOTIFICATION_SETTINGS',
            {
              show: true,
              time: 2000,
              text: 'Ваш аккаунт заблокирован'
            }, 
            { root: true }
          )

          return
        }

        localStorage.setItem('tradingBTCToken', token)
        localStorage.setItem('currentUser', JSON.stringify(user))

        context.commit('user/SET_CURRENT_USER', user, {root: true})
        router.push('/dashboard')
      } else {
        context.commit('SET_LOGIN_ERROR', {code: 'wrong_pass'}) 
      }
    } catch (err) {
      localStorage.removeItem('tradingBTCToken')
      context.commit('SET_LOGIN_ERROR', {code: 'notFoundUser'}) 
    }
  },

  LOGOUT: (context) =>  {
    localStorage.removeItem('tradingBTCToken')
    localStorage.removeItem('currentUser')
    context.commit('user/DELETE_CURRENT_USER',{}, {root: true})
    context.commit('deals/SET_DEALS', [], {root: true})
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
    if (data.ref) {
      context.dispatch('CREATE_REF', {partner: data.ref, user: res.data.user._id})
    }
    if (res?.status === 200) {
      context.dispatch('LOGIN', data)
    }
  },

  CREATE_REF: async (context, {partner, user}) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/createReferralConnection`,
        headers: {'Content-Type': 'application/json'},
        data: {partner, user, date: new Date()}
      })
    } catch (err) {
      console.log("🚀 ~ file: auth.js ~ line 96 ~ CREATE_REF: ~ err", err)
    }
  },

  RESET: async (context, email) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/reset`,
        headers: {'Content-Type': 'application/json'},
        data: email
      })

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

  CHECK_AUTH: async  (context) => {
    const currentUser = localStorage.getItem('currentUser')
    
    if (currentUser) {
      const user = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/checkAuth`,
        headers: {'Content-Type': 'application/json'},
        data: {email: JSON.parse(currentUser).email}
      })
      if (user.data.user) {
        if (user.data.user.isBlocked) {
          context.dispatch('notification/SET_NOTIFICATION_SETTINGS',
            {
              show: true,
              time: 2000,
              text: 'Ваш аккаунт заблокирован'
            }, 
            { root: true }
          )
          context.dispatch('LOGOUT')

          return
        }
        context.commit('user/SET_CURRENT_USER', user.data.user, {root: true})
        localStorage.setItem('currentUser', JSON.stringify(user.data.user))
      } else {
        context.dispatch('LOGOUT')
      }
      
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