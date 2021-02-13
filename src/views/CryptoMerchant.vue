<template>
  <div id="main-wrapper" class="container-fluid">
    <div class="row">
      <base-header />
    </div>
    <div class="row">
      <router-link 
        class="col-lg-2 to-trade" 
        to="dashboard">
        {{ toTrade }}
      </router-link>
      <div class="col-lg-6 merchant">
        <div class="card">
          <div class="card-title">
            <h4>{{ title }}</h4>
          </div>
          <div class="card-body">
            <div v-if="step === 1" class="basic-form">
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
                    v-if="promoCondition"
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
            </div>
            <div v-if="step === 2" class="basic-form">
              <p>Совершите перевод на сумму <b>{{ calculatedAmount }}</b> {{ checked }}</p>
              <p>На адрес <b>{{ address }}</b></p>
              <p>После перевода, нажмите на кнопку <b>Я оплатил</b></p>
              <p>Ваш баланс пополнится после поступления суммы, которую вы перевели, на наш счет</p>
            </div>
            <div v-if="step === 3" class="basic-form">
              <p>Ваш баланс пополнится после поступления суммы, которую вы перевели, на наш счет</p>
              <p>Обычноэто занимает не больше часа и зависит от нагруженности сети</p>
            </div>
            <button 
              v-if="step !== 3"
              class="btn btn-primary m-b-10 m-l-5"
              :disabled="$v.$invalid"
              @click="buttonAction">
              {{ buttonText }}
            </button>
          </div>
        </div>
        <deposit-table v-if="deposits.length" class="deposits" />
      </div>
      <div class="col-lg-4">
        <div class="card">
          <p style="font-size: 14px">
            <b>Инструкция как пополнить баланс:</b>
            <br>1. Выбираем криптовалюту для пополнения (рекомендуем LTC)
            <br>2. Вводим сумму пополнения. Промокод, если у Вас имеется. Нажимаем Далее
            <br>3. Сайт выдает <b>одноразовые</b> реквизиты для пополнения и сумму, которую необходимую перевести на выданные реквизиты
            <br>4. Переходим на <a href="https://bestchange.ru" target="_blank">bestchange.ru</a>
            <br>5. В столбце "Отдадите" выбираете платежную систему/банк с которого хотите совершить перевод (киви/сбер и тд). В "Получите" - криптовалюту которую выбрали в качестве пополнения.
            <br>6. Из предложенных обменников выбирайте подходящий Вам по сумме обмена
            <br>7. Переходите на сайт обменника и следуйте его инструкциям. В реквизиты для получения вставляйте выданный нашим сайтом адрес
            <br>8. После совершения обмена нажмите у нас на сайте кнопку <b>"Я оплатил"</b>
            <br>9. Ожидайте зачисление средств (5-30 минут)
            <br>
            <br>Так же ознакомьтесь с видеоинструкцией пополнения.
           <iframe width="100%" height="300" src="https://www.youtube.com/embed/HkGh8uVYzvc"></iframe>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader'
import DepositTable from '@/components/Table/DepositTable'
import axios from 'axios'
import { required, numeric, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'BalanceMerchant',
  components: {
    BaseHeader,
    DepositTable
  },
  data: () => ({
    calculatedAmount: 0,
    step: 1,
    amount: 0,
    address: '',
    promo: null,
    showErrorPromo: false,
    promoMinDeposit: null,
    checked: 'BTC',
    errPayment: '',
    paysys: [
      {
        img: 'bitcoin_icon.png',
        value: 'BTC',
        id: 'btc',
        text: 'BTC'
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
    ]
  }),

  computed: {
    deposits () {
      return this.$store.getters['deposit/deposits']
    },
    buttonText () {
      return this.step === 1 ? 'Далее' : 'Я оплатил'
    },
    title () {
      return this.step === 1 ? 'Пополнить баланс' : 'Совершите перевод'
    },
    promoCondition () {
      return typeof this.promoMinDeposit !== 'number'
    },
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
      return '< Вернуться'
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
    this.$store.dispatch('deposit/GET_DEPOSITS_BY_USERID', this.currentUser.id)
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
    buttonAction () {
      if (this.step === 1) {
        this.createAdress()
          .then(address => {
            this.address = address.address

            this.getLastPrice(this.checked).then(price => {
              this.step = 2
              this.calculatedAmount = (+this.amount / +price).toFixed(6)
            }).catch(err => console.log(err))
          })
          .catch(err => this.errPayment = err)
      } else if (this.step === 2) {
        this.payed()
      }
    },
    async getLastPrice (type) {
      try {
        const res = await axios({
          method: 'post',
          url: `${process.env.VUE_APP_SERVER_URL_API}/getCurrentPriceForTransaction`,
          headers: {'Content-Type': 'application/json'},
          data: {type}
        })
        console.log(res)
        return res.data.data.prices[0].price
      } catch (err) {
        console.log(err)
      }
    },

    async createAdress () {
      try {
        const res = await axios({
          method: 'post',
          url: `${process.env.VUE_APP_SERVER_URL_API}/getCryptoAddress`,
          headers: {'Content-Type': 'application/json'},
          data: {
            type: this.checked
          }
        })
        return res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    async payed () {
      try {
        this.step = 3
        await axios({
          method: 'post',
          url: `${process.env.VUE_APP_SERVER_URL_API}/watchForBalance`,
          headers: {'Content-Type': 'application/json'},
          data: {
            user: this.currentUser.id,
            amount: this.amount,
            type: this.checked,
            promocode: this.promo,
            address: this.address,
            cryptoAmount: this.calculatedAmount
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
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
      

@media screen and (max-width: 700px)
  .merchant
    margin-left: unset
    margin-top: 10px
</style>