<template>
  <vue-apex-charts type="candlestick" :options="chartOptions" :series="candleData" />
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'CandleChart',
  components: {
    VueApexCharts
  },
  props: {
    candleData: {
      type: Array,
      required: true 
    }
  },

  computed: {
    // dataOfChart () {
    //   return this.candleData.datasets[0].data
    // },
    // pair () {
    //   return this.$store.state.trade.pair
    // },
    
    
    chartOptions () {
      return {
        chartOptions: {
          chart: {
            type: 'candlestick',
          },
          title: {
            text: 'CandleStick Chart - Category X-axis',
            align: 'left'
          },
          annotations: {
            xaxis: [
              {
                x: 'Oct 06 14:00',
                borderColor: '#00E396',
                label: {
                  borderColor: '#00E396',
                  style: {
                    fontSize: '12px',
                    color: '#fff',
                    background: '#00E396'
                  },
                  orientation: 'horizontal',
                  offsetY: 7,
                  text: 'Annotation Test'
                }
              }
            ]
          },
          tooltip: {
            enabled: true,
          },
          xaxis: {
            type: 'category',
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      }
    }
  },

  //  watch: {
  //   dataOfChart () {
  //     this.$nextTick(() => {
  //       this.myChart.update()
  //     })
  //   },
  //   pair: {
  //     deep: true,
  //     handler: async function() {
  //       this.myChart.destroy()
  //       this.createChart('candlestick', this.chartOptions)
  //     }
  //   }
  // },

  // beforeDestroy () {
  //   this.myChart.destroy()
  // },

  // mounted () {
  //   this.$nextTick(() => {
  //     this.createChart('candlestick', this.chartOptions)
  //   })
  // },

  // methods: {
  //   createChart(chartId, chartData) {
  //     const ctx = this.$refs.chart;
  //     this.myChart = new Chart(ctx, {
  //       type: chartData.type,
  //       data: chartData.data
  //     });
  //   }
  // }
}
</script>