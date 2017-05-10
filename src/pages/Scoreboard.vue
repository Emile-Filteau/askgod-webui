<template type="text/html">
  <main-layout>
    <div id="scoreboard">
      <scores-chart
        :options="{responsive: true, maintainAspectRatio: true}">
      </scores-chart>
    </div>
  </main-layout>
</template>

<script>
import ScoresChart from '../components/ScoresChart'

export default {
  name: 'scoreboard',
  components: {
    ScoresChart
  }
}
</script>
