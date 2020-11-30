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
                <div class="form-group">
                  <input 
                    checked
                    type="radio" 
                    id="advusd" 
                    name="payed_paysys"
                    value="ADVCUSD">
                  <label for="advusd">ADVC USD</label>
                </div>
                <input type="hidden" name="merchant_name" value="test_merchant" />
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
                  :disabled="$v.$invalid"
                  class="btn btn-primary m-b-10 m-l-5">
                  Оплатить
                </button>
                <input type="hidden" name="merchant_title" value="Название Вашего проекта" />
                <input type="hidden" name="payment_info" :value="currentUser.id" />
                <input type="hidden" name="sucess_url" value="http://api.kriptosuivre.top:3000/api/merchant" />
                <input type="hidden" name="error_url" value="https://fastexchange.center/merchant_example" />
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

import { required, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'BalanceMerchant',
  components: {
    BaseHeader,
  },
  data: () => ({
    amount: null,
    checked: 'ADVCUSD'
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