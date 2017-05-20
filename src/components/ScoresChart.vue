<template>
  <div>
    <line-chart :height="220" :chart-data="timeline" :options="timelineChartOptions"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart'
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    LineChart
  },
  computed: {
    ...mapState([
      'timelineChartOptions'
    ]),
    ...mapGetters([
      'timeline'
    ])
  }
}
</script>
