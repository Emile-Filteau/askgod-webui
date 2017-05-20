<template type="text/html">
  <main-layout>
    <pie-chart :height="200" :chart-data="results" :options="options"></pie-chart>
  </main-layout>
</template>

<script>
import PieChart from '../components/PieChart'

export default {
  name: 'voting',
  components: {
    PieChart
  },
  data () {
    return {
      results: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#f44336' /* Red */,
            '#3f51b5' /* Indigo */,
            '#ffeb3b' /* Yellow */,
            '#9e9e9e' /* Grey */,
            '#4caf50' /* Green */
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: 'bottom'
        }
      }
    }
  },
  methods: {
    refreshData () {
      fetch('https://voting.nsec/voting.json')
        .then(r => r.json())
        .then(data => {
          this.results.labels = data.map(item => {
            return item.name
          })
          this.results.datasets[0].data = data.map(item => {
            return item.count
          })
          this.results = Object.assign({}, this.results)
        })
    }
  },
  created () {
    const REFRESH_INTERVAL = 1000 * 60 * 5 // 5 minutes
    this.refreshData()
    setInterval(() => {
      this.refreshData()
    }, REFRESH_INTERVAL)
  }
}
</script>
