export const state = () => ({
  sidebar: false,
  teams: [],
  status: {
    event_name: 'NorthSec',
    flags: {},
  },
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setTeams (state, data) {
    state.teams = data.map(entry => ({
      score: entry.value,
      team: entry.team,
      lastFlag: entry.last_submit_time
    }));
  },
  setStatus (state, data) {
    state.status = {
      is_admin: data.is_admin,
      is_team: data.is_team,
      is_guest: data.is_guest,
      event_name: data.event_name,
      flags: {
        team_self_register: data.flags.team_self_register,
        team_self_update: data.flags.team_self_update,
        board_read_only: data.flags.board_read_only,
        board_hide_others: data.flags.board_hide_others,
      }
    }
  }
}

export const actions = {
  async LOAD_TEAMS ({ commit }) {
    let { data } = await this.$axios.get(`/api/1.0/scoreboard/index.json`)
    commit('setTeams', data)
  },
  async LOAD_STATUS ({ commit }) {
    let { data } = await this.$axios.get(`/api/1.0/index.json`)
    commit('setStatus', data)
  }
}
