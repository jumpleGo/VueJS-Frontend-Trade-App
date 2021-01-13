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
                <div class="payment-types">
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
                      :value="psys.value"
                      class="radio">
                    <label 
                      :class="['payment-type', {'active': checked === psys.value}]" 
                      :for="psys.id">
                      <img :src="`/images/icons/${psys.img}`">
                      {{ psys.text }}
                    </label>
                  </div>
                </div>
                <input type="hidden" name="merchant_name" value="tr_merchant" />
                <div class="form-group">
                  <label>Сумма $</label>
                  <input 
                    v-model="amount"
                    class="form-control" 
                    name="amount"
                    
                    placeholder="Сумма">
                  <span v-if="!$v.amount.required" class="error"> Обязательное поле</span>
                  <div v-if="!$v.amount.minValue ">
                    <span 
                      v-if="typeof promoMinDeposit !== 'number'"
                      class="error"> 
                      Минимальная сумма для пополнения {{ settings.minAmountForUp }}
                    </span>
                    <span 
                      v-else
                      class="error"> 
                      Минимальная сумма пополнения для получения бонуса {{ promoMinDeposit }}
                    </span>
                  </div>
                  <input type="hidden" name="payment_num" value="348">
                </div>
                <div class="form-group">
                  <label>Промокод</label>
                  <input 
                    v-model="promo"
                    class="form-control" 
                    name="promo"
                    placeholder="Промокод">
                </div>
                <div 
                  v-if="showErrorPromo"
                  class="error">
                  Такого промокода не существует
                </div>
                <div 
                  v-if="activePromocode && activePromocode._id">
                  <span class="promocode-info">Ваш промокод активен! Вы получите бонус в размере {{ bonusText }}</span>
                  <h3 v-if="!$v.amount.$invalid" class="total">Итого зачислится на баланс: {{ totalWithPromo }}$</h3>
                </div>
                <button 
                  type="submit" 
                  class="btn btn-primary m-b-10 m-l-5"
                  :disabled="$v.$invalid">
                  Оплатить
                </button>
                <input type="hidden" name="merchant_title" value="Название Вашего проекта" />
                <input type="hidden" name="payment_info" :value="`${currentUser.id};${promo ? promo : ''}`" />
                <input type="hidden" name="sucess_url" value="http://kriptosuivre.top/dashboard" />
                <input type="hidden" name="error_url" value="http://kriptosuivre.top/dashboard" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <deposit-table />
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader'
import DepositTable from '@/components/Table/DepositTable'
import { required, numeric, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'BalanceMerchant',
  components: {
    BaseHeader,
    DepositTable
  },
  data: () => ({
    amount: 0,
    promo: null,
    showErrorPromo: false,
    promoMinDeposit: null,
    checked: 'ADVCUSD',
    paysys: [
      {
        img: 'qiwi_icon.png',
        value: 'QWRUB',
        id: 'qwrub',
        text: 'Qiwi RUB'
      },
      {
        img: 'advc_icon.png',
        value: 'ADVCUSD',
        id: 'advusd',
        text: 'AdvCash USD'
      },
      {
        img: 'advc_icon.png',
        value: 'ADVCRUB',
        id: 'advrub',
        text: 'AdvCash RUB'
      },
      {
        img: 'payeer_icon.png',
        value: 'PRRUB',
        id: 'prrub',
        text: 'Payeer RUB'

      },
      {
        img: 'tether_icon.png',
        value: 'USDTERC',
        id: 'usdterc',
        text: 'USDT ERC20'
      },


      {
        img: 'bitcoin_icon.png',
        value: 'BTC',
        id: 'btc',
        text: 'BTC'
      },
      {
        img: 'ethereum_icon.png',
        value: 'ETH',
        id: 'eth',
        text: 'ETH'
      },
      {
        img: 'litecoin_icon.png',
        value: 'LTC',
        id: 'ltc',
        text: 'LTC'
      },
      {
        img: 'dogecoin_icon.png',
        value: 'DOGE',
        id: 'doge',
        text: 'DOGE'
      },
      {
        img: 'monero_icon.png',
        value: 'XMR',
        id: 'xmr',
        text: 'Monero'
      },
      {
        img: 'dash_icon.png',
        value: 'DASH',
        id: 'dash',
        text: 'DASH'
      },
    ]
  }),

  computed: {
    settings () {
      return this.$store.state.settings.settings
    },
    bonusText () {
      return this.activePromocode.minDeposit 
        ? `${this.activePromocode.bonus}$ к вашему депозиту` 
        : `${this.activePromocode.bonus} % от суммы поплнения` 
    },
    totalWithPromo () {
      return this.activePromocode.minDeposit 
        ? +this.amount + +this.activePromocode.bonus 
        : (+this.amount + +this.amount * +this.activePromocode.bonus / 100).toFixed()
    },
    toTrade () {
      return '< Трейдить'
    },
    currentUser () {
      return this.$store.state.user.currentUser
    },
    activePromocode() {
      return this.$store.state.promocodes.activePromocode
    }
  },

  mounted () {
    this.$store.commit('promocodes/SET_ACTIVE_PROMOCODE', null)
  },

  watch: {
    promo (promocode) {
      if (this.showErrorPromo) {
        this.showErrorPromo = false
      }
      if (promocode.length === 14) {
        this.checkPromocode(promocode)
      } else {
        this.$store.commit('promocodes/SET_ACTIVE_PROMOCODE', null)
        this.promoMinDeposit = null
      }
    },

    activePromocode (promoInfo) {
      if (promoInfo?._id) {
        this.promoMinDeposit = promoInfo.minDeposit
      } else if (typeof promoInfo === 'object') {
        this.showErrorPromo = true
      }
    }
  },

  validations: function (){
    return {
      amount: {
        required,
        numeric,
        minValue: minValue(this.promoMinDeposit ?? this.settings.minAmountForUp)
      },
    }
  },

  methods: {
    async checkPromocode (promocode) {
      this.$store.dispatch('promocodes/CHECK_PROMOCODE', promocode)
    },
  }
}
</script>
<style lang="sass" scoped>
.error
  font-size: 12px
  color: red
.total
  font-size: 18px
  margin-top: 20px
.promocode-info
  background: #e6eafa
  padding: 5px 10px
  color: #68696b
  font-size: 14px
  border-radius: 5px

.radio
  display: none
.payment-types
  display: flex
  flex-wrap: wrap
.payment-type
  width: 106px
  &:hover
    cursor: pointer
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  font-size: 14px
  font-weight: 600
  padding: 5px
  border: 1px solid transparent
  height: 100%
  img
    width: 33px
.payment-type + .payment-type
  margin-left: 20px
.active
  border: 1px solid blue
  
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