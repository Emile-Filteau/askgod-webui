const faker = require('faker')
const moment = require('moment')

faker.seed(666);

const START_TIME = moment().subtract(2, 'days')
const MAX_TEAM_COUNT = 2
const MAX_FLAG_VALUE = 10
const TOTAL_FLAG_COUNT = 50


function getRandomInt(max = 0) {
	return Math.floor(Math.random() * Math.floor(max));
}

function buildScores(i) {
  const submitTime = START_TIME.clone()
  const scores = Array.from({length: getRandomInt(TOTAL_FLAG_COUNT)}, (_, i) => ({
      "submit_time": submitTime.add(getRandomInt(30), 'minutes').format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      "value": getRandomInt(MAX_FLAG_VALUE),
      "total": 0,
  }))
  let total = 0;
  for (const element of scores) {
    total += element.value
    element.total = total;
  }
  return scores;
}

module.exports = Array.from({length: MAX_TEAM_COUNT}, (_, i) => ({
	"team": {
		"name": faker.company.companyName(),
		"country": faker.address.countryCode(),
		"website": faker.internet.url(),
		"id": i + 1
	},
	"score": buildScores(i),
}))
