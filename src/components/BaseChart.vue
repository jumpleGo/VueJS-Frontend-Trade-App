<script>
import { Line, mixins } from 'vue-chartjs'
//  PLUGINS
import chartjsPluginAnnotation from "chartjs-plugin-annotation"
import zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-moment';

const { reactiveProp } = mixins

export default {
  extends: Line,
  name: 'BaseChart',
  mixins: [reactiveProp],
  computed: {
    options () {
      return {
        type: 'line',
        responsive: true,
        elements: {
          point:{
            radius: 0
          }
        },
        animation: {
          duration: 0 // general animation time
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
            id: 'y',
            type: 'linear',
          }]
        },     
        annotation: {
          drawTime: 'afterDraw',
          annotations: []
        },   
        plugins: {
          zoom: {
            pan: {
              threshold: 10,
              sensitivity:0.5,
              enabled: true,
              mode: 'x',
              rangeMin: {
                x: new Date(this.firstChartData.x),
              },
              rangeMax: {
                x: new Date().setMinutes((new Date()).getMinutes() + 20),
              },
              onPanComplete: () => {
                console.log(this.$data._chart)
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
    },
    annotations () {
      return this.$store.state.deals.annotations
    },
    dataOfChart () {
      return this.chartData.datasets[0].data
    },
    pair () {
      return this.$store.state.trade.pair
    },
    firstChartData () {
      return this.chartData.datasets[0].data[0]
    },
  },

  watch: {
    dataOfChart () {
      if (this.$data._chart) {
        this.$data._chart.update()
      }
    },
    pair: {
      deep: true,
      handler: function() {
        this.$data._chart.destroy()
        this.initChart()
      }
    },
    annotations (val) {
      this.$data._chart.update();
      if (val.length) {
        this.$data._chart.options.annotation.drawTime = "afterDraw";
        this.$data._chart.options.annotation.annotations = val
      } else {
        this.$data._chart.options.annotation.drawTime = null;
        this.$data._chart.options.annotation.annotations = []
      }
      this.$data._chart.update();
    }
  },

  beforeDestroy () {
    this.$data._chart.destroy()
  },

  created () {
    
  },

  async mounted () {
    await this.addPlugins()
    await this.initChart()
    this.$nextTick(() => {
      if (this.annotations.length) {
        this.$data._chart.options.annotation.annotations = this.annotations
        this.$data._chart.update() 
      }
    })
  },

  methods: {
    initChart () {
      this.renderChart(this.chartData, this.options)
      this.$data._chart.$zoom._originalOptions.x = {}
      this.$data._chart.update()     
    },
    addPlugins () {
      this.addPlugin(chartjsPluginAnnotation)
      this.addPlugin(zoom)
    }
  }

}
</script>