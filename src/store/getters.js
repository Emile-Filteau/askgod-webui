import moment from 'moment-es6'

export default {
  dateFromNowLTS: state => (date) => {
    return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
  }
}
