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
  UPLOAD_IMAGE: async (_, formDataImages) => {
    try {
      let uploads = formDataImages.map(async image => {
        let link = await axios({
          method: 'post',
          url: `${process.env.VUE_APP_SERVER_URL_API}/uploadImage`,
          headers: {'Content-Type': 'application/json'},
          data: image
        })
        return link
      })
      const links = Promise.all(uploads)
      return links
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