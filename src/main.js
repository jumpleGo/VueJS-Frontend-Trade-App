import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Vuelidate from 'vuelidate'
import moment from 'moment';
import VueMoment from 'vue-moment';
import vClickOutside from 'v-click-outside'

import "./assets/css/main.scss";

Vue.use(VueMoment, { moment });
Vue.use(vClickOutside)

Vue.use(moment)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)


Vue.axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL_API


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
