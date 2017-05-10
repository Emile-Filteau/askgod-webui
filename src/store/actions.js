import Resources from '../resources'
import * as actions from './action-types'
import * as mutations from './mutation-types'
import { IS_PRIVATE } from '../utils'

/**
 * Initialize the store on application load
 */
const initStore = async ({ dispatch }) => {
  dispatch(actions.SET_SCOREBOARD)
  dispatch(actions.SET_TIMELINE)

  // Private version only
  await dispatch(actions.SET_STATUS)

  // Only if is_team
  await dispatch(actions.SET_TEAM_FLAGS)
  await dispatch(actions.SET_CURRENT_TEAM)
}

/**
 * Fetch thing from the REST API
 */
const fetchThing = async ({ commit }, action) => {
  commit(action.mutation, await Resources.fetch(action.thing))
}

/**
 * Build scores data
 */
const getScores = async ({ commit }) => {
  commit(mutations.SET_ADMIN_TEAMS, await Resources.fetch('/teams'))
  commit(mutations.SET_ADMIN_SCORES, await Resources.fetch('/scores'))
}

const updateTeam = async({ disptach }, teamData) => {
  return Resources.update('/team', teamData)
}

const updateFlagNote = async({ dispatch }, flag) => {
  let body = flag
  return Resources.update(`/team/flags/${flag.id}`, body)
}
const submitFlag = async({ disptach }, flag) => {
  return Resources.post('/team/flags', {
    flag: flag
  })
}

const initWebsocket = async({ dispatch }, ws) => {
  // XXX Make use of middleware to log stuff
  if (IS_PRIVATE) {
    ws.onopen = (event) => {
      // console.info('Socket connected', event)
    }
    ws.onerror = (event) => {
      // console.log('Socket error', event)
    }
    ws.onmessage = (event) => {
      // console.log('Socket event', event)
      dispatch('websocketEvent', JSON.parse(event.data))
    }
  } else {
    const REFRESH_INTERVAL = 60 * 1000
    setInterval(() => {
      // console.log(`Auto refresh every ${REFRESH_INTERVAL}`, event)
      dispatch('fetchTimeline')
      dispatch('fetchScoreboard')
    }, REFRESH_INTERVAL)
  }
}

/**
 * Trigger mutation on websocket event
 */
const wsEventTypes = {
  // Webscockets events
  TEAM_UPDATE: 'team-updated',
  TEAM_REMOVED: 'team-removed',
  SCORE_UPDATED: 'score-updated'
}

const websocketEvent = async ({ dispatch, commit }, data) => {
  switch (data.metadata.type) {
    case wsEventTypes.TEAM_UPDATED:
      commit(mutations.SET_CURRENT_TEAM, data.metadata.team)
      break

    case wsEventTypes.TEAM_REMOVE:
      console.log('Unhandled event')
      break

    case wsEventTypes.SCORE_UPDATED:
      commit(mutations.UPDATE_TIMELINE, data.metadata)
      dispatch(actions.SET_SCOREBOARD)
      break
  }
}

const updateCurrentRoute = async ({ commit }, newRoute) => {
  await commit(mutations.SET_CURRENT_ROUTE, newRoute)
}

export default {
  initStore,
  initWebsocket,
  fetchThing,
  getScores,
  websocketEvent,
  updateCurrentRoute,
  updateTeam,
  updateFlagNote,
  submitFlag
}
