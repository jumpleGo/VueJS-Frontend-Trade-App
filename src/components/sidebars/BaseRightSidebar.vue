<template>
  <div class="left-sidebar --right">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <ul id="sidebar-menu">
          <div class="form-actions pb-0 m-l-15 m-r-15">
            <div class="pair">{{ pair.base }}/{{ pair.quote }}</div>
            <div 
              class="price" 
              :style="{color: trendColor}">
              ${{ showPrice }}
            </div>
            <form class="form form-horizontal" @submit.prevent>
              <div class="form-body">
                <div class="form-group period-group">
                  <span>Выберите период</span>
                  <button @click="showPeriodDropdown = !showPeriodDropdown">  
                    {{ period }}
                  </button>
                  <div 
                    v-if="showPeriodDropdown"
                    class="period-dropdown">
                    <p 
                      v-for="p in periods" 
                      :key="`index-${p}`"
                      @click="setPeriod(p)">
                      {{ p }} секунд
                    </p>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group-my">
                    <input 
                      type="number" 
                      v-model="amount"
                      id="btc-limit-buy-price" 
                      class="form-control" 
                      placeholder="Сумма $" 
                      min="0"
                      name="btc-limit-buy-price"
                      @keydown="keyDown($event)"
                      @input="errBalance = false">
                      <span class="feature-amount-title">Возможный доход:</span>
                      <span class="feature-amount">$ {{ futureAmount }}</span>
                      <span class="error" v-if="errBalance">Недостаточно средств</span>
                  </div>
                </div>
              </div>
            </form>
            <button 
              :disabled="!amount || disabledDeal"
              class="btn btn-success btn-rounded btn-block btn-glow"
              @click="createDeal('high')">
              Выше
              </button>
            <button 
              :disabled="!amount || disabledDeal"
              class="btn btn-danger btn-rounded btn-block btn-glow"
              @click="createDeal('low')">
              Ниже
            </button>
          </div>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRightSidebar',
  data: function(){
    return {
      lastPriceInfo: null,
      showPeriodDropdown: false,
      periods: [30, 60, 120],
      amount: 0,
      disabledDeal: false,
      errBalance: false
    }
  },
  computed: {
    futureAmount () {
      return (this.amount * 1.8).toFixed(2)
    },
    pair () {
      return this.$store.state.trade.pair
    },
    currentUser () {
      return this.$store.state.user.currentUser
    },
    chartData () {
      return this.$store.getters['trade/chartData']()
    },
    rates () {
      return this.chartData?.datasets[0].data
    },
    lastPrice() {
      return this.rates[this.rates.length - 1] // {x: time, y: price}
    },
    price () {
      return this.$store.state.trade.currentPrice.toFixed(2)
    },
    showPrice () {
      return +this.price ? this.price : this.lastPrice?.y
    },
    trend () {
      return this.$store.state.trade.currentTrend
    },
    trendColor () {
      return this.trend === 'sell' ? '#F13057' : '#0ABF9E'
    },
    deals () {
      return this.$store.getters['deals/deals']
    },
    period () {
      return this.$store.state.trade.period
    },
    isDealOpen () {
      return this.$store.state.deals.isDealOpen
    },
    MODE_BALANCE () {
      return this.$store.getters['user/MODE_BALANCE']
    }
  },

  methods: {
    keyDown (event) {
      if (event.code === 'Minus' || event.code === 'Equal') {
        event.preventDefault()
      }
    },
    setPeriod(p) {
      this.$store.commit('trade/SET_PERIOD', p)
      this.showPeriodDropdown = !this.showPeriodDropdown
    },

    async createDeal (trend) {
      if (this.currentUser[this.MODE_BALANCE] < this.amount) {
        this.errBalance = true
      } else {
        let date = new Date()
        await this.$store.dispatch('deals/CREATE_DEAL', {
          mode: this.MODE_BALANCE,
          trend,
          user: this.currentUser.id,
          currentPrice: this.showPrice,
          pair: this.pair.id,
          base: this.pair.base,
          quote: this.pair.quote,
          period: this.period,
          amount: this.amount,
          startDate: new Date(),
          status: 'NEW',
          endDate: new Date(date.setSeconds( date.getSeconds() + this.period ))
        })
        
        await this.$store.dispatch('user/UPDATE_USER_BALANCE', {
          mode: this.MODE_BALANCE,
          amount: this.amount,
          type: 'minus'
        })
        this.amount = 0

        this.disabledDeal = true
        setTimeout(() => {
          this.disabledDeal = false
        }, 2000)
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.left-sidebar
  padding-top: 50px !important
.input-group-my
  display: flex
  flex-direction: column
.feature-amount-title
  font-size: 15px
  font-weight: 500
.feature-amount
  color: #0ABF9E
  font-size: 20px
.error
  font-size: 14px
  color: red
#sidebar-menu
  margin-top: 7px
.period-dropdown
  display: flex
  flex-direction: column
  position: absolute
  box-shadow: 3px 2px 8px -1px rgba(0, 0, 0, 0.26)
  background: white
  margin-top: 80px
  background: white
  z-index: 40
  p
    padding: 10px 15px
    margin: 0
    &:hover
      cursor: pointer
      background: rgba(0, 0, 0, 0.03)
.period-group
  display: flex
  flex-direction: column
  span
    font-size: 15px
    margin-top: 25px
  button
    width: 50%
    height: 30px
    border: 1px solid gray
    background: white
.price
  font-size: 21px
  font-weight: 500
.pair
  font-size: 23px
button
  border: unset
button:hover
  border: unset
button:disabled
  cursor: not-allowed

@media screen and (max-width: 700px)
  .left-sidebar
    width: 100%
    position: relative
    padding-top: unset !important
    height: unset
    z-index: 1
  .last-deals
    display: none
  .scroll-sidebar
    padding-bottom: unset
</style>