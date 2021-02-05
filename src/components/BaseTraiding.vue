<template>
  <div
    v-if="drawChart"
    class="chart">
    <div v-if="chartType === 'line'">
      <span class="period-chart" @click="periodChart = 0">Сбросить</span>
      <span
        v-for="(p, index) in periods"
        :key="`${index}--p`"
        class="period-chart"
        @click="periodChart = p">
          {{p}}m
        </span>
    </div>
    <base-chart
      v-if="chartType === 'line'"
      class="line-chart"
      :height="200"
      :period-chart="periodChart"
      :chart-data="chartData" />
    <candlestick
      v-if="chartType === 'candle'"
      :height="200"
      class="candle-chart" />
  </div>
  <div
    v-else
    class="loader">
    Loading...
  </div>
</template>
<script>
import Candlestick from './Candlestick'
import BaseChart from './BaseChart'
export default {
  name: 'BaseTraiding',
  components: {
    BaseChart,
    Candlestick
  },
  data: () => ({
    periodChart: 0,
    periods: [5, 15, 30]
  }),
  computed: {
    drawChart () {
      return this.$store.state.trade.drawChart
    },
    chartType () {
      return this.$store.state.trade.chartType
    },
    pair () {
      return this.$store.state.trade.pair
    },
    chartData () {
      return this.$store.getters['trade/chartData'](this.periodChart)
    },
  },

  watch: {
    pair: {
      deep: true,
      handler: async function() {
        this.$store.dispatch('trade/SEND_SOCKET_MESSAGE_TRADE').then(async () => {
          this.$store.commit('trade/SET_DRAW_CHART', false)
          this.$store.commit('trade/CLEAR_OLD_DATE')
          this.getChartsData()
        })
      }
    }
  },

  beforeDestroy() {
    this.$store.dispatch('trade/DISCONNECT_SOCKET')
    this.$store.commit('trade/CLEAR_OLD_DATE')
    this.$store.commit('trade/SET_DRAW_CHART', false)
  },
  created () {
    this.$store.commit('trade/CLEAR_OLD_DATE')
  },
  mounted () {
    this.setup()
  },
  methods: {
    async setup () {
      await this.getChartsData()
      await this.initSocket()
    },
    async initSocket () {
      await this.$store.dispatch('trade/CONNECT_SOCKET')
    },
    async getChartsData () {
      let promises = [this.$store.dispatch('trade/GET_CHART_DATA'), this.$store.dispatch('trade/GET_CANDLE_DATA')]
      await Promise.all(promises).then(() => {
        this.$store.commit('trade/SET_DRAW_CHART', true)
      })
    }
  }
}
</script>

<style lang="sass">
.period-chart
  padding: 5px
  margin-right: 5px
  border-right: 1px solid #cecece
  &:hover
    cursor: pointer
.chart
  position: relative
</style>
