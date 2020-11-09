<template>
  <canvas ref="chart"></canvas>
</template>
<script>
import Chart from 'chart.js';
export default {
  name: 'BaseChart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    myChart: null
  }),

  computed: {
    dataOfChart () {
      return this.chartData.datasets[0].data
    },
    pair () {
      return this.$store.state.trade.pair
    },
    
    
    chartOptions () {
      return {
        type: 'line',
        data: this.chartData,
        options: {
          elements: {
            point:{
              radius: 0
            }
          },
          tooltips: {
            enabled: false
          },
          steppedLine: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines : {
                display : false
              },
              ticks: {
                maxTicksLimit: 20,
                autoskip: true,
              }
            }],
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x'
              },

              zoom: {
                enabled: true,
                mode: 'x',
              }
            }
          }
        }
      }
    }
  },

   watch: {
    dataOfChart () {
      this.$nextTick(() => {
        this.myChart.update()
      })
    },
    pair: {
      deep: true,
      handler: async function() {
        this.myChart.destroy()
        this.createChart('line-chart', this.chartOptions)
      }
    }
  },

  beforeDestroy () {
    this.myChart.destroy()
  },

  mounted () {
    this.$nextTick(() => {
      this.createChart('line-chart', this.chartOptions)
    })
  },

  methods: {
    createChart(chartId, chartData) {
      const ctx = this.$refs.chart;
      this.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    }
  }
}
</script>