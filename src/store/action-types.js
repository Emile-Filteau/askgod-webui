import * as types from './mutation-types'

export const SET_STATUS = {
  type: 'fetchThing',
  thing: '',
  mutation: types.SET_STATUS
}

export const SET_TEAM_FLAGS = {
  type: 'fetchThing',
  thing: '/team/flags',
  mutation: types.SET_TEAM_FLAGS
}

export const SET_CURRENT_TEAM = {
  type: 'fetchThing',
  thing: '/team',
  mutation: types.SET_CURRENT_TEAM
}

export const SET_SCOREBOARD = {
  type: 'fetchThing',
  thing: '/scoreboard',
  mutation: types.SET_SCOREBOARD
}

export const SET_TIMELINE = {
  type: 'fetchThing',
  thing: '/timeline',
  mutation: types.SET_TIMELINE
}

export const SET_ADMIN_FLAGS = {
  type: 'fetchThing',
  thing: '/flags',
  mutation: types.SET_ADMIN_FLAGS
}

export const SET_ADMIN_TEAMS = {
  type: 'fetchThing',
  thing: '/teams',
  mutation: types.SET_ADMIN_TEAMS
}

export const SET_CURRENT_ROUTE = {
  type: 'updateCurrentRoute',
  mutation: types.SET_CURRENT_ROUTE
}
