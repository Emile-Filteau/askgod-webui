import moment from 'moment';
import map from 'lodash/map';
import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';

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
  fireworksDialog: false,
  websocketURL: 'wss://askgod.nsec/1.0/events?type=timeline',
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
  },
  addScore(state, data) {
    var meta = data.metadata;
    var index = findIndex(state.timeline, i => i.team.id === meta.teamid);
    if (index >= 0) {
      // Append new score if team present in dataset
      state.timeline[index].score.push(meta.score);      
    }
  },
  setFireworksDialog(state, value) {
    console.log(value);
    state.fireworksDialog = value;
  }
}

const postfix = ''; //'/index.json';
export const actions = {
  async LOAD_TIMELINE ({ commit }) {
    let { data } = await this.$axios.get(`/1.0/timeline${postfix}`)
    commit('setTimeline', data)
  },
  async LOAD_TEAMS ({ commit }) {
    let { data } = await this.$axios.get(`/1.0/teams${postfix}`)
    commit('setTeams', data)
  },
  async LOAD_SCOREBOARD ({ commit }) {
    let { data } = await this.$axios.get(`/1.0/scoreboard${postfix}`)
    commit('setScoreboard', data)
  },
  async LOAD_STATUS ({ commit }) {
    let { data } = await this.$axios.get(`/1.0${postfix}`)
    commit('setStatus', data)
  },
  async SUBMIT_FLAG ({ commit }, flag) {
    return this.$axios.post(`/1.0/team/flags${postfix}`, {
      flag: flag
    })
  },
  async WEBSOCKET_EVENT ({ commit, dispatch }, data) {
    commit('addScore', data);
    dispatch('LOAD_SCOREBOARD');
  }
}

export const getters = {
  menuItems: state => {
    return filter(state.app.items, i => {

      if (i.to === '/submit-flag') {
        return state.status.is_team;
      }

      return true;
    });
  },
  app: state => {
    return {
      ...state.app,
    }
  },
  autoRefresh: state => {
    return state.settings.autoRefresh;
  },
  top3: state => {
      return state.scoreboard.slice(0, 3);
  },
  scoreboard: state => {
    var result = state.scoreboard; 
    
    for(var i = 0; i < result.length; i++) {
      result[i].rank = i+1;
    }
    return result;
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
