function routeByPath (path) {
  return []
    .concat(...Object.values(ROUTES))
    .filter(r => r.path === path)
    .pop()
}

export const ROUTES = {
  is_guest: [{
    component: 'Scoreboard',
    path: '/scoreboard/',
    name: 'Scoreboard',
    index: 1
  }, {
    component: 'Leaderboard',
    path: '/scoreboard/leaderboard',
    name: 'Leaderboard',
    index: 2
  }],
  is_team: [{
    component: 'TeamSettings',
    path: '/scoreboard/team-settings',
    name: 'Team Settings',
    index: 3
  }, {
    component: 'TeamFlags',
    path: '/scoreboard/team-flags',
    name: 'Team Flags',
    index: 4
  }],
  is_admin: [{
    component: 'Teams',
    path: '/scoreboard/teams',
    name: 'Admin Teams',
    index: 5
  }, {
    component: 'AdminFlags',
    path: '/scoreboard/admin-flags',
    name: 'Admin Flags',
    index: 6
  }, {
    component: 'AdminScores',
    path: '/scoreboard/admin-scores',
    name: 'Admin Scores',
    index: 7
  }]
}

export {
  routeByPath
}
