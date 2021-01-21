<template>
  <div class="left-sidebar">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <div class="card-body">
          <div class="trade-history-table">
            <div class="table-responsive">
              <table class="table table-xs pairs-table">
                <thead>
                  <tr>
                    <th>Пара</th>
                    <th>Коэф</th>
                  </tr>
                </thead>
                <tbody>
                  <tr @click="toggleList">
                    <td class="pair">
                      {{ `${currentPair.base}/${currentPair.quote}` }}
                      <img :class="['arrow', {'rotated': showAllPairs}]" src="/images/icons/back.svg">
                    </td>
                    <td><span class="percent">1.8</span></td>
                  </tr>
                </tbody>
                <tbody 
                  v-if="showAllPairs"
                  class="all-pair-modal">
                  <tr 
                    v-for="pair in allPairs"
                    :key="pair._id"
                    :disabled="currentPair.id === pair.id"
                    :class="{'active' : currentPair.id === pair.id}"
                    @click="choosePair(pair)">
                    <td class="pair">{{ `${pair.base}/${pair.quote}` }}</td>
                    <td><span class="percent">1.8</span></td>
                  </tr>
                </tbody>
              </table>
              <div v-if="lastFiveDeals.length" class="last-deals">
                <p class="last-deals-header">Последние сделки</p>
                <div 
                  v-for="(deal, index) in lastFiveDeals"
                  :key="`${deal.id}--${index}`"
                  class="last-deal">
                  <div>
                    <span class="pair">{{ deal.base }}/{{ deal.quote }}</span>
                    <span class="date">{{ deal.startDate | moment('L') }}</span>
                  </div>
                  <div>
                    <span 
                      class="status"
                      :style="{color: textColor(deal.status)}">
                      {{ deal.statusWord(deal.status)}}
                    </span>
                    <span class="trend">{{ deal.trendWord(deal.trend) }}</span>
                  </div>
                  <div>
                    <span class="amount">{{ deal.amount }}$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLeftSidebar',
  data: () => ({
    showAllPairs: false
  }),
  computed: {
    allPairs () {
      return this.$store.state.trade.allPairs
    },
    currentPair () {
      return this.$store.state.trade.pair
    },
    isDealOpen () {
      return this.$store.state.deals.isDealOpen
    },
    deals () {
      return this.$store.getters['deals/deals']
    },
    lastFiveDeals () {
      return this.deals.slice(0,5)
    },
  },
  mounted () {
    this.$store.dispatch('trade/GET_PAIRS')
  },

  methods: {
    toggleList () {
      if (!this.isDealOpen) {
        this.showAllPairs = !this.showAllPairs
      }
    },
    choosePair (pair) {
      this.$store.commit('trade/SET_PAIR', pair)
      this.toggleList()
    },
    textColor (status) {
      switch (status) {
        case 'NEW':
          return 'grey'
        case 'RETURN':
          return 'grey'
        case 'LOSE':
          return '#e8103c'
        case 'WIN':
          return 'rgb(10, 191, 158)'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.arrow
  width: 16px
  margin-left: 5px
  transform: rotate(-90deg)
  transition: all 0.3s
.rotated
  transform: rotate(90deg)
.left-sidebar
  padding-top: 50px !important
table
  margin-bottom: unset
.pairs-table
  z-index: 1000000
  background: white
.last-deal
  padding: 3px 5px
  display: flex
  align-items: top
  border-bottom: 1px solid rgba(208, 213, 219, 0.4)
  div
    width: 33.3333%
    display: flex
    flex-direction: column
    &:nth-child(2)
      padding-left: 10px
    &:last-child
      align-items: flex-end
.status
  font-size: 14px
.pair, .amount
  font-size: 17px
  font-weight: 500
.date, .trend
  font-size: 12px
.date
  color: grey
.all-pair-modal
  position: absolute
  z-index: 1000000
  width: 100%
  background: white
  td 
    width: 100%
.active 
  cursor: pointer
  background: rgba(0,0,0, 0.03)
tbody > tr:hover
  cursor: pointer
  background: rgba(0,0,0, 0.03)

tbody tr td 
  padding: 5px 10px
.pair
  font-size: 14px
  color: black
.percent
  padding: 2px 5px
  color: #ffffff
  background-color: #e8103c
  box-shadow: 0 4px 12px rgba(241, 48, 87, 0.3)
  border-radius: 3px
.card-body
  padding: 0px !important
.last-deals
  &-header
    font-size: 14px
    margin-bottom: 0
    font-weight: 500
    padding: 5px
    background: rgba(208, 213, 219, 0.7)
</style>