'use strict';

const status = require('./1.0/status')
const scoreboard = require('./1.0/scoreboard')
const teamInfo = require('./1.0/team-info')
const teamFlags = require('./1.0/team-flags')
const timeline = require('./1.0/timeline')
const allFlags = require('./1.0/flags')

module.exports = () => ({
  status,
  scoreboard,
  teamInfo,
  teamFlags,
  timeline,
  allFlags,
})
