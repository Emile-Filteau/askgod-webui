import moment from 'moment-es6'

export default {
  activePageIndex: state => {
    let route = state.app.currentRoute
    return route ? route.index.toString() : '-1'
  },
  dateFromNowLTS: state => (date) => {
    return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
  },
  timeline: state => {
    var screenOptions = state.app.screenOptions
    var timeline = {
      datasets: [],
      labels: []
    }

    switch (screenOptions.showTeams) {
      case '5':
        timeline.datasets = state.timeline.datasets.slice(0, 5)
        break
      case '10':
        timeline.datasets = state.timeline.datasets.slice(0, 10)
        break
      default:
        timeline = {
          datasets: state.timeline.datasets
        }
    }

    return timeline
  },
  screenOptions: state => {
    return state.app.screenOptions
  }
}
