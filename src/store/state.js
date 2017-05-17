import { routeByPath } from '../routes'

export default {
  // App related
  app: {
    currentRoute: routeByPath(window.location.pathname),
    screenOptions: {
      showTeams: 'All',
      showLeaders: false,
      refreshInterval: 60
    }
  },
  // API Status
  settings: {
    is_admin: false,
    is_team: false,
    is_guest: false,
    event_name: 'NorthSec 2017',
    flags: {
      team_self_register: false,
      team_self_update: false,
      board_read_only: false,
      board_hide_others: false
    }
  },
  // is_team
  teamFlags: [],
  myTeam: {
    name: '',
    website: '',
    country: 'CA'
  },
  // is_admin
  adminFlags: [],
  adminScores: [],
  adminTeams: [],
  // is_guest
  scoreboard: [],
  timeline: {
    datasets: []
  },
  timelineChartOptions: {
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
}
