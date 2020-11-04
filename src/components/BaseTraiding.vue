<template>
  <div class="chart">
    <base-chart :chart-data="chartData" />
  </div>
</template>
<script>
import BaseChart from './BaseChart'
export default {
  name: 'BaseTraiding',

  data: () =>  ({
  
  }),
  computed: {
    chartData () {
      return this.$store.state.trade.chartData
    }
  },
  components: {
    BaseChart
  },

  mounted () {
    this.$store.dispatch('trade/GET_CHART_DATA')
  } 
}
</script>