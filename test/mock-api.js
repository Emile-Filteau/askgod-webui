'use strict';

const status = require('./api/1.0/index.json')
const scoreboard = require('./api/1.0/scoreboard/index.json')
const teamInfo = require('./api/1.0/team/index.json')
const teamFlags = require('./api/1.0/team/flags/index.json')
const timeline = require('./api/1.0/timeline/index.json')


module.exports = () => {
  const data = {
    status,
    scoreboard,
    teamInfo,
    teamFlags,
    timeline,
  }
  return data
}
