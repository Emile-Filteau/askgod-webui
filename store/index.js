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

export const state = () => ({
  sidebar: false,
  app: {
    clipped: true,
    drawer: true,
    fixed: false,
    items: [
      { icon: 'timeline', title: 'Timeline', to: '/' },
      { icon: 'view_list', title: 'Scoreboard', to: '/scoreboard' },
      { icon: 'flag', title: 'Submit Flag', to: '/submit-flag' },
      { icon: 'info', title: 'Status', to: '/status' }
    ],
    miniVariant: true,
    right: true,
    rightDrawer: false,

  },
  settings: {
    autoRefresh: false,
  },
  teams: [],
  scoreboard: [],
  status: {
    event_name: 'NorthSec',
    flags: {},
  },
  timeline: null,
  timelineChartOptions: {
    maintainAspectRatio: false,
    responsive: true,
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
  toggleSidebar (state) {
    state.sidebar = !state.sidebar;
  },
  setTeams (state, data) {
    state.teams = data;
  },
  setScoreboard (state, data) {
    state.scoreboard = data.map(entry => ({
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
  },
  setTimeline (state, data) {
    state.timeline = data;
  },
  toggle (state, key) {
    state.app[key] = !state.app[key];
    console.log('app/'+key, state.app[key]);
  },
  updateSettings(state, obj) {
    let { key, value } = obj;
    // The state need's to be mutated here
    state.settings[key] = !state.settings[key];
    console.log('settings/'+key, state.settings[key]);
  }
}

const prefix = '/api/1.0';
export const actions = {
  async LOAD_TIMELINE ({ commit }) {
    let { data } = await this.$axios.get(`${prefix}/timeline/index.json`)
    commit('setTimeline', data)
  },
  async LOAD_TEAMS ({ commit }) {
    let { data } = await this.$axios.get(`${prefix}/teams/index.json`)
    commit('setTeams', data)
  },
  async LOAD_SCOREBOARD ({ commit }) {
    let { data } = await this.$axios.get(`${prefix}/scoreboard/index.json`)
    commit('setScoreboard', data)
  },
  async LOAD_STATUS ({ commit }) {
    let { data } = await this.$axios.get(`${prefix}/index.json`)
    commit('setStatus', data)
  },
  async SUBMIT_FLAG ({ commit }, flag) {
    return this.$axios.post(`${prefix}/team/flags`, {
      flag: flag
    })
  }
}

export const getters = {
  app: state => {
    return {
      ...state.app,
    }
  },
  timelineChartData: state => {
    return {
      datasets: state.timeline.map(({team, score}) => {
        let color = COLORS[team.id % COLORS.length];
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
        return b.data[b.data.length - 1].y - a.data[a.data.length - 1].y
      }),
    };
  }
}
