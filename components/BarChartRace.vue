<script>
import { HorizontalBar, mixins } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default(input) {
        return input
      }
    },
    options: {
      type: Object,
      default() {
        return {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
