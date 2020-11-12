<template>
  <div class="chart">
    <base-chart 
      v-if="chartType === 'line'"
      class="line-chart"
      :chart-data="chartData" />
    <candlestick 
      v-if="chartType === 'candle'" 
      :height="200"
      class="candle-chart"
      :chart-data="candleData" />
  </div>
</template>
<script>
import Candlestick from './Candlestick'
import BaseChart from './BaseChart'
export default {
  name: 'BaseTraiding',

  data: () =>  ({
  }),
  computed: {
    chartType () {
      return this.$store.state.trade.chartType
    },
    chartData () {
      return this.$store.getters['trade/chartData']
    },
    candleData () {
      return this.$store.getters['trade/candleData']
    },
    pair () {
      return this.$store.state.trade.pair
    }
  },

  watch: {
    pair: {
      deep: true,
      handler: async function() {
        this.$store.commit('trade/CLEAR_OLD_DATE')
        await this.$store.dispatch('trade/SEND_SOCKET_MESSAGE_TRADE')
        await this.$store.dispatch('trade/GET_CHART_DATA')
        await this.$store.dispatch('trade/GET_CANDLE_DATA')
      }
    }
  },
  components: {
    BaseChart,
    Candlestick
  },
  beforeDestroy() {
    this.$store.dispatch('trade/DISCONNECT_SOCKET')
  },

  mounted () {
    this.$store.commit('trade/CLEAR_OLD_DATE')
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('trade/GET_CHART_DATA')
      await this.$store.dispatch('trade/GET_CANDLE_DATA')
      await this.$store.dispatch('trade/CONNECT_SOCKET')
    }
  }
}
</script>

<style lang="sass">
.chart
  position: relative
</style>