<script>
import { Candlestick } from 'vue-chartjs-financial';
import zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-moment';
import "chartjs-plugin-annotation";

export default {
  name: 'Candlestick',
  extends: Candlestick,
  computed: {
    candleData () {
      return this.$store.getters['trade/candleData']
    },
    lastCandle () {
      return this.$store.getters['trade/lastCandle']
    },
    firstChartData () {
      return this.candleData.datasets[0].data[0]
    },
    pair () {
      return this.$store.state.trade.pair
    },
    options () {
      return {
        type: 'candlestick',
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            id: 'x',
            type: 'time',
            time: {
              minUnit: 'minute',
              displayFormats: {'minute': 'HH:mm'},
            },
            ticks: {
              maxRotation: 0,
              maxTicksLimit: 5
            },
          }],
          yAxes: [{
            id: 'y'
          }],
          annotation: {
           
            drawTime: 'afterDatasetsDraw', // (default)
            dblClickSpeed: 350, // ms (default)
            annotations: [{
              drawTime: 'afterDraw', // overrides annotation.drawTime if set
              display: true,
              type: 'line',
              scaleID: 'y',
              value: '29500',
              borderColor: 'red',
              borderWidth: 2,
            }]
          },
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
              speed: 0.08,
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
      immediate: true,
      handler: function() {
        if (this._data._chart) {
          this._data._chart.update()
        }
      }
    },
    pair: {
      deep: true,
      handler: async function() {
        this.$data._chart.destroy()

        this.renderChart(this.candleData, this.options);
        if (this._data._chart) {
          setTimeout(() => this._data._chart.update(), 1000)
        }
      }
    }
  },

  beforeDestroy () {
    this._data._chart.destroy()
  },

  mounted () {
    this.addPlugin(zoom),
    this.renderChart(this.candleData, this.options);
    this._data._chart.$zoom._originalOptions.x = {}
    this.$data._chart.update()
  },
}
</script>