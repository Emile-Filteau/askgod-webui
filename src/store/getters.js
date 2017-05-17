import moment from 'moment-es6'

export default {
  activePageIndex: state => {
    let route = state.app.currentRoute
    return route ? route.index.toString() : '-1'
  },
  dateFromNowLTS: state => (date) => {
    return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
  }
}
