import moment from 'moment-es6'

const DEBUG = 0 // Activate for local dev.

// Taken from http://htmlcolorcodes.com/color-chart/
// Flat Design Color Chart
export const colors = [
  '#f44336' /* Red */,
  '#e91e63' /* Pink */,
  '#9c27b0' /* Purple */,
  '#673ab7' /* Deep Purple */,
  '#3f51b5' /* Indigo */,
  '#2196f3' /* Blue */,
  '#03a9f4' /* Light Blue */,
  '#00bcd4' /* Cyan */,
  '#009688' /* Teal */,
  '#4caf50' /* Green */,
  '#8bc34a' /* Light Green */,
  '#cddc39' /* Lime */,
  '#ffeb3b' /* Yellow */,
  '#ffc107' /* Amber */,
  '#ff9800' /* Orange */,
  '#ff5722' /* Deep Orange */,
  '#795548' /* Brown */,
  '#9e9e9e' /* Grey */,
  '#607d8b' /* Blue Grey */
]

export const API_ENDPOINTS = {
  private: 'https://askgod.nsec/1.0',
  public: 'https://www.nsec.io/scoreboard/1.0',
  dev: '/static'
}

export const ORIGIN = {
  private: 'https://www.nsec',
  public: 'https://www.nsec.io'
}

export const IS_PUBLIC = (window.location.origin === ORIGIN.public)
export const IS_PRIVATE = (window.location.origin === ORIGIN.private)

var counter = 0

export default {
  getApiURL () {
    if (DEBUG) {
      // Return wath you want
      return API_ENDPOINTS.private
    } else if (window.location.origin === ORIGIN.private) {
      return API_ENDPOINTS.private
    } else if (IS_PUBLIC) {
      return API_ENDPOINTS.public
    } else {
      return API_ENDPOINTS.dev
    }
  },
  getRandomArbitrary (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },
  getRandomChartData (datasets) {
    counter++

    // Random test data
    return datasets.map(set => {
      var last = Object.assign({}, set.data[set.data.length - 1])

      if (counter % 10 === 0) {
        last.x = last.x.clone().add(7, 'hour')
      } else {
        // Moment object must be cloned to not mutate and prevent ui update
        let randomAddMin = this.getRandomArbitrary(30, 60)
        last.x = last.x.clone().add(randomAddMin, 'minute')
      }

      last.y += this.getRandomArbitrary(0, 7)

      if (last.y > 0) {
        set.data = [].concat(set.data, [last])
      }
      return set
    })
  },
  buildChartDataset (team, score) {
    let color = colors[team.id % colors.length]
    return {
      teamId: team.id,
      label: team.name,
      borderColor: color,
      backgroundColor: color,
      fill: false,
      data: [].concat(score.map((s) => ({
        x: moment(s.submit_time),
        y: s.total
      })))
    }
  }
}
