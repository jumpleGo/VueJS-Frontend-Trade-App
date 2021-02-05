<template>
  <div id="main-wrapper">
    <base-header />
    <div class="row">
      <router-link 
        class="col-lg-2 to-trade" 
        to="dashboard">
        {{ toTrade }}
      </router-link>
      <div v-if="!currentUser.withdrawalBlocked" class="col-lg-6 offset-1">
        <div class="card">
          <div class="card-title">
            <h4>Вывод средств</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form @submit.prevent>
                <div class="form-group">
                  <button 
                    v-for="t in paymentTypes" 
                    :key='t.name'
                    :class="['payment-type', {'active': type === t.name}]"
                    @click="type = t.name">
                    <img :src="t.src">
                  </button>
                </div>
                <div class="form-group">
                  <label>Сумма $</label>
                  <input 
                    v-model="amount"
                    class="form-control" 
                    placeholder="Сумма">
                    <span 
                      v-if="errBalance"
                      class="error">
                      Недостаточно средств на балансе
                    </span>
                    <span 
                      v-if="errength"
                      class="error">
                      min: {{ this.engthWithdrawal }}
                    </span>
                </div>
                <div 
                  v-if="type === 'Card'" 
                  class="form-group">
                  <label>Номер карты</label>
                  <input 
                    v-model="card"
                    type="tel" 
                    inputmode="numeric" 
                    pattern="[0-9\s]{16}" 
                    autocomplete="cc-number" 
                    maxlength="16" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    class="form-control">
                </div>
                <div 
                  v-else-if="type === 'Qiwi'" 
                  class="form-group">
                  <label>Кошелек / Номер карты</label>
                  <input 
                    v-model="card"
                    type="tel" 
                    inputmode="numeric" 
                    pattern="[0-9\s]{16}" 
                    autocomplete="cc-number" 
                    maxlength="16" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    class="form-control">
                </div>
                <div 
                  v-else-if="type === 'YandexMoney'" 
                  class="form-group">
                  <label>Кошелек / Номер карты</label>
                  <input 
                    v-model="card"
                    type="tel" 
                    inputmode="numeric" 
                    pattern="[0-9\s]{16}" 
                    autocomplete="cc-number" 
                    maxlength="16" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    class="form-control">
                </div>
                <div 
                  v-else-if="type === 'Payeer'" 
                  class="form-group">
                  <label>Кошелек</label>
                  <input 
                    v-model="card"
                    type="tel" 
                    inputmode="numeric" 
                    pattern="[0-9\s]{10}" 
                    autocomplete="cc-number" 
                    maxlength="10" 
                    placeholder="Pxxxxxxxxxx" 
                    class="form-control">
                </div>
                <button 
                  type="button" 
                  :disabled="$v.$invalid"
                  class="btn btn-primary m-b-10 m-l-5"
                  @click="createRequest">
                  Создать заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="col-lg-6 offset-1">
        <div class="card">
          <h4>Для вашего аккаунта заблокирована возможность вывода средств.</h4>
        </div>
      </div>
    </div>
    <withdrawal-table v-if="!currentUser.withdrawalBlocked" />
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader'
import WithdrawalTable from '@/components/Table/WithdrawalTable'

import { required, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'Withdrawal',
  components: {
    BaseHeader,
    WithdrawalTable
  },
  data: () => ({
    type: 'Card',
    card: null,
    amount: null,
    errBalance: false,
    errength: false,
    paymentTypes: [
      {
        name: 'Card',
        src: '/images/icons/visa.jpg'
      },
      {
        name: 'Payeer',
        src: '/images/icons/payeer.png'
      },
      {
        name: 'Qiwi',
        src: '/images/icons/qiwi.png'
      },
      {
        name: 'YandexMoney',
        src: '/images/icons/ym.svg'
      }
    ]
  }),

  computed: {
    MODE_BALANCE () {
      return this.$store.getters['user/MODE_BALANCE']
    },
    engthWithdrawal () {
      return this.$store.state.settings.settings.minAmount
    },
    toTrade () {
      return '< Вернуться'
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
      card: {
        required
      }
    }
  },

  methods: {
    createRequest () {
      if (this.amount < this.engthWithdrawal) {
        this.errength = true
        setTimeout (() => {
          this.errength = false
        }, 2000)
        return 
      }

      
      if (this.currentUser.balance >= this.amount) {
        this.$store.dispatch('withdrawal/CREATE_REQUEST', {
          card: this.card,
          amount: this.amount,
          userId: this.currentUser.id,
          date: new Date(),
          status: 'NEW',
          type: this.type,
          mode: this.MODE_BALANCE
        }).then(() => {
          this.card = null
          this.amount = null
          this.$store.dispatch('notification/SET_NOTIFICATION_SETTINGS', {
            time: 2000,
            text: 'Заявка на вывод успешно создана',
            show: true
          })
        })
      } else {
        this.errBalance = true
        setTimeout (() => {
          this.errBalance = false
        }, 2000)
      }
    }
  }
}
</script>
<style lang="sass" scoped>

.payment-type
  background: white
  padding: 0 10px
  height: 60px
  border: unset
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.38)
  img
    width: 50px
  &:focus
    outline: none
.active
  border: 1px solid blue
.payment-type + .payment-type
  margin-left: 10px
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