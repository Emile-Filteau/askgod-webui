<template>
  <div>
    <line-chart :height="220" :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart'

export default {
  components: {
    LineChart
  },
  computed: {
    datacollection () {
      return this.$store.state.timeline
    }
  },
  data () {
    return {
      options: {
        legend: {
          position: 'bottom'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              unitStepSize: 2,
              displayFormats: {
                hour: 'h:mm a'
              }
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 15,
              maxRotation: 0
            }
          }]
        }
      }
    }
  }
}
</script>
