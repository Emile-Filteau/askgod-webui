const HOST = 'http://localhost:3000';

export const state = () => ({
  sidebar: false,
  teams: []
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
  }
}

export const actions = {
  async LOAD_TEAMS ({ commit }) {
    let { data } = await this.$axios.get(`${HOST}/api/1.0/scoreboard/index.json`)
    commit('setTeams', data)
  }
}
