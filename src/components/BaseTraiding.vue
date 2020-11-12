<template>
  <div class="chart">
    <base-chart :chart-data="chartData" />
    <candle-chart :candle-data="candleData" />
  </div>
</template>
<script>
import CandleChart from './CandleChart'
import BaseChart from './BaseChart'
export default {
  name: 'BaseTraiding',

  data: () =>  ({
  }),
  computed: {
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
        await this.$store.dispatch('trade/SEND_SOCKET_MESSAGE')
        await this.$store.dispatch('trade/GET_CHART_DATA')
      }
    }
  },
  components: {
    BaseChart,
    CandleChart
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