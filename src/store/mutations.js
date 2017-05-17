import moment from 'moment-es6'
import utils from '../utils'
import * as types from './mutation-types'

// IS_DEMO APP
const IS_DEMO = false

export default {
  [types.SET_ADMIN_SCORES] (state, data) {
    if (data) {
      state.adminScores = data
    }
  },
  [types.SET_ADMIN_TEAMS] (state, data) {
    if (data) {
      state.adminTeams = data
    }
  },
  [types.SET_CURRENT_TEAM] (state, data) {
    if (data) {
      state.myTeam = Object.assign(state.myTeam, data)
    }
  },
  [types.SET_ADMIN_FLAGS] (state, data) {
    if (data) {
      state.adminFlags = data
    }
  },
  [types.SET_STATUS] (state, data) {
    if (data) {
      state.settings = data
    }
  },
  [types.SET_SCOREBOARD] (state, data) {
    if (data) {
      state.scoreboard = data
    }
  },
  [types.SET_TIMELINE] (state, data) {
    if (!IS_DEMO && data) {
      state.timeline = {
        datasets: data.map(({team, score}) => utils.buildChartDataset(team, score))
      }
    } else {
      if (state.timeline.datasets.length > 0) {
        state.timeline = {
          datasets: utils.getRandomChartData(state.timeline.datasets)
        }
      } else if (data) {
        state.timeline = {
          datasets: data.map(({team, score}) => utils.buildChartDataset(team, score))
        }
      }
    }
  },
  [types.SET_TEAM_FLAGS] (state, data) {
    if (data) {
      state.teamFlags = data
    }
  },
  [types.UPDATE_TIMELINE] (state, data) {
    let index = state.timeline.datasets.findIndex(element => element.teamId === data.teamid)

    if (index >= 0) {
      state.timeline.datasets[index].data = [].concat(
        state.timeline.datasets[index].data, [{
          x: moment(data.score.submit_time),
          y: data.score.total
        }])

      // Make it a new reference so the changes can be propagated
      state.timeline = Object.assign({}, state.timeline)
    } else {
      throw new Error('Oh oh, an error has occured. Invalid team ID')
    }
  },
  [types.SET_CURRENT_ROUTE] (state, newRoute) {
    state.app.currentRoute = newRoute
    window.history.pushState(
      null,
      state.app.currentRoute.name,
      state.app.currentRoute.path
    )
  }
}
