import emojiFlags from 'emoji-flags'
import moment from 'moment';

// Taken from http://htmlcolorcodes.com/color-chart/
// Flat Design Color Chart
export const COLORS = [
  '#3f51b5' /* Indigo */,
  '#2196f3' /* Blue */,
  '#03a9f4' /* Light Blue */,
  '#00bcd4' /* Cyan */,
  '#009688' /* Teal */,
  '#f44336' /* Red */,
  '#e91e63' /* Pink */,
  '#9c27b0' /* Purple */,
  '#673ab7' /* Deep Purple */,
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
];

const getTeamColor = (id) => COLORS[id % COLORS.length]

export const state = () => ({
  app: {
    clipped: true,
    drawer: true,
    fixed: false,
    items: [
      { icon: 'bar_chart', title: 'Timeline', to: '/' },
      { icon: 'view_list', title: 'Scoreboard', to: '/scoreboard' },
      { icon: 'flag', title: 'Submit Flag', to: '/submit-flag' },
      { icon: 'settings', title: 'Settings', to: '/settings' }
    ],
    miniVariant: true,
    right: true,
    rightDrawer: false,
  },

  fireworksDialog: false,
  latestScore: {
    teamName: null,
    score: null,
  },
  settings: {
    autoRefresh: false,
    theme: 'dark',
    animationEnabled: false,
  },
  myTeam: {
    id: null,
    name: null,
    country: null,
    website: null,
  },
  teams: [],
  scoreboard: [],
  status: {
    event_name: 'NorthSec',
    flags: {},
  },
  timeline: [],
  timelineChartOptions: {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0, // general animation time
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'hour',
          unitStepSize: 2,
          displayFormats: {
            hour: 'h:mm a'
          }
        },
        ticks: {
          autoSkip: true,
          autoSkipPadding: 15,
          maxRotation: 0
        }
      }]
    }
  }
})

export const mutations = {
  setTeams (state, data) {
    state.teams = data;
  },
  setScoreboard (state, data) {
    state.scoreboard = data
    .sort((a, b) => b.value - a.value)
    .map((x, index) => ({
      ...x.team,
      rank: index + 1,
      lastFlag: x.last_submit_time,
      score: x.value,
      color: getTeamColor(x.team.id),
      flagEmoji: emojiFlags.countryCode(x.team.country).emoji,
    }))
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
  },
  setTimeline(state, data) {
    state.timeline = data;
  },
  toggle(state, key) {
    state.app[key] = !state.app[key];
    console.debug('app/'+key, state.app[key]);
  },
  updateSettings(state, obj) {
    let { key, value } = obj;
    // The state need's to be mutated here
    state.settings[key] = !state.settings[key];
    console.debug('settings/'+key, state.settings[key]);
  },
  addScore(state, data) {
    var meta = data.metadata;
    var index = state.timeline.findIndex(i => i.team.id === meta.teamid);
    if (index >= 0) {
      // Append new score if team present in dataset
      state.timeline[index].score.push(meta.score);
    }
  },
  setFireworksDialog(state, data) {
    if (state.settings.animationEnabled) {
      state.fireworksDialog = data.show;
      if (data.score) {
        state.latestScore = data.score
      }
    } else {
      state.fireworksDialog = false;
      console.warn('Animation disabled')
    }
  },
  setTeamInfo(state, data) {
    state.myTeam = data;
  }
}

export const actions = {
  async LOAD_TIMELINE ({ commit }) {
    try {
      let { data } = await this.$axios.get(`/1.0/timeline`)
      commit('setTimeline', data)
    } catch (error) {
      console.error(error.message)
    }
  },
  async LOAD_TEAMS ({ commit }) {
    try {
      let { data } = await this.$axios.get(`/1.0/teams`)
      commit('setTeams', data)
    } catch (error) {
      console.error(error.message)
    }
  },
  async LOAD_SCOREBOARD ({ commit }) {
    try {
      let { data } = await this.$axios.get(`/1.0/scoreboard`)
      commit('setScoreboard', data)
    } catch (error) {
      console.error(error.message)
    }
  },
  async LOAD_STATUS ({ commit }) {
    try {
      let { data } = await this.$axios.get(`/1.0`)
      commit('setStatus', data)
    } catch (error) {
      console.error(error.message)
    }
  },
  async SUBMIT_FLAG ({ commit }, flag) {
    return this.$axios.post(`/1.0/team/flags`, {
      flag: flag
    })
  },
  async LOAD_MY_TEAM_INFO({ commit}) {
    try {
      let { data } = await this.$axios.get(`/1.0/team`)
      commit('setTeamInfo', data)
    } catch (error) {
      console.error(error.message)
    }
  },
  async UPDATE_TEAM_INFO ({ commit }, myTeam) {
    return this.$axios.put(`/1.0/team`, {
      id: myTeam.id,
      name: myTeam.name,
      website: myTeam.website,
      country: myTeam.country,
    })
  },
  async WEBSOCKET_EVENT ({ commit, dispatch }, data) {
    commit('addScore', data)
    setTimeout(() => commit('setFireworksDialog', {show: false}), 3000)
    commit('setFireworksDialog', {show: true, score: data})
    dispatch('LOAD_SCOREBOARD')
  }
}

export const getters = {
  menuItems: state => {
    return state.app.items.filter( i => {

      if (i.to === '/submit-flag') {
        return state.status.is_team;
      }

      return true;
    });
  },
  app: state => ({...state.ap}),
  autoRefresh: state => state.settings.autoRefresh,
  theme: state => state.settings.theme,
  top3: state => state.scoreboard.slice(0, 3),
  scoreboard: state => state.scoreboard,
  latestScore: state => state.latestScore,
  timelineChartData: state => {
    return {
      datasets: state.timeline.map(({team, score}) => {
        const color = getTeamColor(team.id)
        return {
          teamId: team.id,
          label: team.name,
          borderColor: color,
          backgroundColor: color,
          fill: false,
          lineTension: 0,
          data: [].concat(score.map((s) => ({
            x: moment(s.submit_time),
            y: s.total
          })))
        }
      }).sort(function (a, b) {
        // Sort by total score
        const [, aLast = {y: 0}] = a.data
        const [, bLast = {y: 0}] = b.data
        return aLast.y - bLast.y
      }),
    };
  }
}
