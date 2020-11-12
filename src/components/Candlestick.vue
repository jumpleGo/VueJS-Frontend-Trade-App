<script>
import { Candlestick } from 'vue-chartjs-financial';
import zoom from 'chartjs-plugin-zoom';
export default {
  name: 'Candlestick',
  extends: Candlestick,
  props: {
    chartData: {
      type: Object,
      required: true
    }

  },
  computed: {
    lastCandle () {
      return this.chartData.datasets[0].data[this.chartData.datasets[0].data.length - 1]
    },
    pair () {
      return this.$store.state.trade.pair
    },
    options () {
      return {
        type: 'candlestick',
        data: this.chartData,
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: true
            }
          }]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              enabled: true,
              mode: 'x',
              speed: 0.1,
              threshold: 2,
              sensitivity: 3,
            }
          }
      }
      }
    }
  },

  watch: {
    lastCandle: {
      deep: true,
      handler: function() {
        this._data._chart.update()
      }
    },
    pair: {
      deep: true,
      handler: function() {
        this._data._chart.destroy()
        this.renderChart(this.chartData, this.options);
        setTimeout(() => this._data._chart.update(), 100)
      }
    }
  },

  beforeDestroy () {
    this._data._chart.destroy()
  },

  mounted () {
    this.$nextTick(() => {
      this.addPlugin(zoom);
      this.renderChart(this.chartData, this.options);
      setTimeout(() => this._data._chart.update(), 100)
    })
  },
}
</script>