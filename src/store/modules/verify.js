import axios from 'axios'

const state = () => ({
  verifyRequest: {}
})


const mutations = {
  SET_VERIFY_REQ: (state, req) => state.verifyRequest = req,
}

const actions = {
  CREATE_REQUEST: async (context, request) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/createVerificationRequest`,
        headers: {'Content-Type': 'application/json'},
        data: request
      })
      if (result.status === 200) {
        context.commit('SET_VERIFY_REQ', result.data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  GET_USER_REQUEST: async (context, user) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL_API}/getVerifyRequest`,
        headers: {'Content-Type': 'application/json'},
        data: {user}
      })
      console.log("🚀 ~ file: verify.js ~ line 36 ~ GET_USER_REQUEST: ~ result", result)
      if (result.status === 200) {
        context.commit('SET_VERIFY_REQ', result.data[0])
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}