<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  name: 'BaseChart',
  props: ['options'],
  data: () => ({
    gradient: null,
  }),

  mounted () {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 0);

    this.gradient.addColorStop(0, "rgba(0, 231, 255, 0.4)");
    this.gradient.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient.addColorStop(1, "rgba(0, 231, 255, 0)");
    setTimeout(() => {
      this.renderChart(this.chartData, this.options);
      window.dispatchEvent(new Event('resize'));
    }, 1000)
  },
}
</script>