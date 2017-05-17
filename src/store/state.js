import { routeByPath } from '../routes'
export default {
  app: {
    currentRoute: routeByPath(window.location.pathname),
    currentUser: {
      timeline: {
        settings: {}
      }
    }
  },
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
  myTeam: {
    name: '',
    website: '',
    country: 'CA'
  },
  teamFlags: [],
  adminFlags: [],
  adminScores: [],
  adminTeams: [],
  scoreboard: [],
  timeline: {
    datasets: []
  }
}
