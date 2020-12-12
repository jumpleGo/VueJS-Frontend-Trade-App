<template>
  <div id="main-wrapper">
    <base-header />
    <div class="row">
      <router-link 
        class="col-lg-2 to-trade" 
        to="dashboard">
        {{ toTrade }}
      </router-link>
      <div class="col-lg-6 offset-1">
        <div class="card">
          <div class="card-title">
            <h4>Пополнить баланс</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form method="post" action="https://fastexchange.center/merchant_pay">
                <div 
                  v-for="psys in paysys"
                  :key="psys.id"
                  class="form-group">
                  <input 
                    v-model="checked"
                    :checked="checked === psys.value"
                    type="radio" 
                    :id="psys.id" 
                    name="payed_paysys"
                    :value="psys.value">
                  <label :for="psys.id">
                    {{ psys.text }}
                  </label>
                </div>
                <input type="hidden" name="merchant_name" value="tr_merchant" />
                <div class="form-group">
                  <label>Сумма $</label>
                  <input 
                    v-model="amount"
                    class="form-control" 
                    name="amount"
                    placeholder="Сумма">
                  <input type="hidden" name="payment_num" value="348">
                </div>
                <button 
                  type="submit" 
                  class="btn btn-primary m-b-10 m-l-5">
                  Оплатить
                </button>
                <input type="hidden" name="merchant_title" value="Название Вашего проекта" />
                <input type="hidden" name="payment_info" :value="currentUser.id" />
                <input type="hidden" name="sucess_url" value="http://kriptosuivre.top/dashboard" />
                <input type="hidden" name="error_url" value="http://kriptosuivre.top/dashboard" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader'
import axios from 'axios'
import { required, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'BalanceMerchant',
  components: {
    BaseHeader,
  },
  data: () => ({
    amount: null,
    checked: 'ADVCUSD',
    paysys: [
      {
        value: 'ADVCUSD',
        id: 'advusd',
        text: 'AdvCash USD'
      },
      {
        value: 'ADVCRUB',
        id: 'advrub',
        text: 'AdvCash RUB'
      },
      {
        value: 'PRUSD',
        id: 'prusd',
        text: 'Payeer USD'
      },
      {
        value: 'PRRUB',
        id: 'prrub',
        text: 'Payeer RUB'

      },
      {
        value: 'QWRUB',
        id: 'qwrub',
        text: 'Qiwi RUB'
      },
      {
        value: 'USDTERC',
        id: 'usdterc',
        text: 'USDT ERC20'
      }
    ]
  }),

  computed: {
    toTrade () {
      return '< Трейдить'
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },

  validations: function (){
    return {
      amount: {
        required,
        numeric
      },
    }
  },

  methods: {
    async getCourses () {
      try {
        const res = await axios({
          method: 'get',
          url: 'https://fastexchange.center/obmen/get_merchant_cources/tr_merchant',
          headers: {'Content-Type': 'application/json'},
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.error
  font-size: 14px
  color: red
.btn
  border-width: unset
  
.to-trade
  margin-top: 10px
  padding-left: 55px
  &:hover
    text-decoration: unset
      
</style>