<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
//  PLUGINS
import zoom from 'chartjs-plugin-zoom';
import * as annotation from 'chartjs-plugin-annotation';
import 'chartjs-adapter-moment';


export default {
  extends: Line,
  name: 'BaseChart',
  mixins: [reactiveProp],
  computed: {
    dataOfChart () {
      return this.chartData.datasets[0].data
    },
    pair () {
      return this.$store.state.trade.pair
    },
    firstChartData () {
      return this.chartData.datasets[0].data[0]
    },
    options: function () {
      return {
        type: 'line',
        responsive: true,
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
            id: 'x',
            stepSize: 6,
            unitStepSize: 5,
            type: 'time',
            time: {
              minUnit: 'minute',
              displayFormats: {'minute': 'HH:mm'},
            },
            ticks: {
              maxRotation: 0,
              maxTicksLimit: 5
            },
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
          annotation: {
            drawTime: 'afterDraw',
            annotations: [{
              display: true,
              drawTime: 'afterDatasetsDraw',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y',
              value: 18200,
              endValue: 18201,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 4,
            }]
          },
          zoom: {
            pan: {
              threshold: 10,
              enabled: true,
              mode: 'x',
              rangeMin: {
                x: new Date(this.firstChartData.x),
              },
              rangeMax: {
                x: new Date().setMinutes((new Date()).getMinutes() + 20),
              },
              onPanComplete: () => {
                console.log(this._data._chart)
              }
            },
            zoom: {
              enabled: true,
              mode: 'x',
              rangeMin: {
                x: new Date(this.firstChartData.x),
                y: null
              },
              rangeMax: {
                x: new Date().setMinutes((new Date()).getMinutes() + 20),
                y: null
              },
              sensitivity:0.5,
            }
          }
        }
      }
    }
  },

  watch: {
    dataOfChart () {
      if (this.$data._chart) {
        this.$data._chart.update()
      }
    },
    pair: {
      deep: true,
      handler: async function() {
        this.$data._chart.destroy()
        this.initChart()
      }
    }
  },

  beforeDestroy () {
    this.$data._chart.destroy()
  },

  created () {
    this.addPlugin({
      id: 'annotation',
      ...annotation
    })
    this.addPlugin(zoom)
  },

  mounted () {
    this.initChart()
  },

  methods: {
    initChart () {
      this.renderChart(this.chartData, this.options)
      this.$data._chart.$zoom._originalOptions.x = {}
      
      this.$data._chart.update()
    }
  }

}
</script>