import Resources from '../resources'
import * as actions from './action-types'
import * as mutations from './mutation-types'

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

const updateCurrentRoute = async ({ commit }, newRoute) => {
  await commit(mutations.SET_CURRENT_ROUTE, newRoute)
}

/**
 * Trigger mutation on websocket event
 */
const wsEventTypes = {
  // Webscockets events
  CONNECTED: 'connected',
  ERROR: 'error',
  RELOAD: 'reload',
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

    case wsEventTypes.RELOAD:
      dispatch(actions.SET_SCOREBOARD)
      dispatch(actions.SET_TIMELINE)
      break

    case wsEventTypes.CONNECTED:
      console.log('Socket connected', data.event)
      break

    case wsEventTypes.ERROR:
      console.log('Socket error', data.event)
      break

    default:
      console.error('Unsupported event type', data.metadata.type)
  }
}

export default {
  initStore,
  fetchThing,
  getScores,
  websocketEvent,
  updateCurrentRoute,
  updateTeam,
  updateFlagNote,
  submitFlag
}
