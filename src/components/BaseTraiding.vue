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
      return this.$store.getters['trade/chartData']
    }
  },
  components: {
    BaseChart
  },
  beforeDestroy() {
    this.$store.dispatch('trade/DISCONNECT_SOCKET')
  },

  mounted () {
    this.$store.dispatch('trade/CONNECT_SOCKET')
  } 
}
</script>

<style lang="sass">
.chart
  position: relative
</style>