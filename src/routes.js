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
    component: 'TeamFlags',
    path: '/scoreboard/team-flags',
    name: 'Flags',
    index: 4
  }, {
    component: 'TeamSettings',
    path: '/scoreboard/team-settings',
    name: 'Settings',
    index: 3
  }],
  is_admin: [{
    component: 'Teams',
    path: '/scoreboard/teams',
    name: 'Teams',
    index: 5
  }, {
    component: 'AdminFlags',
    path: '/scoreboard/admin-flags',
    name: 'Flags',
    index: 6
  }, {
    component: 'AdminScores',
    path: '/scoreboard/admin-scores',
    name: 'Scores',
    index: 7
  }]
}

export {
  routeByPath
}
