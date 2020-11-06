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
                mode: 'xy'
              },

              zoom: {
                enabled: true,
                mode: 'xy',
              }
            }
          }
        }
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.createChart('line-chart', this.chartOptions)
    })
  },

  watch: {
    dataOfChart () {
      this.myChart.update()
    }
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