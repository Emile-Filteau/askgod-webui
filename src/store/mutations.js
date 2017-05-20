import { Notification } from 'element-ui'
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

      // Time to builds tags dictionnary
      for (let i = 0; i < data.length; i++) {
        var flagTags = data[i].tags
        Object.keys(flagTags).map(tagType => {
          // Create new set for undefined tag type
          if (!state.flagTagsDict[tagType]) {
            state.flagTagsDict[tagType] = new Set()
          }
          let tagName = flagTags[tagType].split(':').pop()
          state.flagTagsDict[tagType].add(tagName)
        })
      }
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

      // Sort by total score
      state.timeline.datasets.sort(function (a, b) {
        return b.data[b.data.length - 1].y - a.data[a.data.length - 1].y
      })

      state.timeline = Object.assign({}, state.timeline)
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
  [types.UPDATE_TIMELINE] (state, meta) {
    var index = state.timeline.datasets.findIndex(element => element.teamId === meta.teamid)
    var newTimeline = state.timeline

    if (index >= 0) {
      // Append new score if team present in dataset
      newTimeline.datasets[index].data = [].concat(
        newTimeline.datasets[index].data,
        [{
          x: moment(meta.score.submit_time),
          y: meta.score.total
        }]
      )
    } else {
      // Append the team to the dataset
      let newIndex = newTimeline.datasets.length
      newTimeline.datasets[newIndex] = utils.buildChartDataset(meta.team, meta.score)
    }

    // Sort by total score
    newTimeline.datasets.sort(function (a, b) {
      return b.data[b.data.length - 1].y - a.data[a.data.length - 1].y
    })

    // Make it a new reference so the changes can be propagated
    state.timeline = newTimeline

    Notification.success({
      title: 'Yupppyyyy!',
      message: `Team ${meta.team.name} scored ${meta.score.value} points`
    })
  },
  [types.SET_CURRENT_ROUTE] (state, newRoute) {
    state.app.currentRoute = newRoute
    window.history.pushState(
      null,
      state.app.currentRoute.name,
      state.app.currentRoute.path
    )
  },
  [types.UPDATE_SCREEN_OPTIONS] (state, screenOptions) {
    state.app.screenOptions = screenOptions
  }
}
