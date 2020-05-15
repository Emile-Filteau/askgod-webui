const faker = require('faker')
const moment = require('moment')

faker.seed(666);

const MAX_TEAM_TOTAL = 200
const MAX_TEAM_COUNT = 50
const START_TIME = moment().subtract(2, 'days')


function getRandomInt(max = 0) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Array.from({length: MAX_TEAM_COUNT}, (_, i) => ({
	"team": {
		"name": faker.company.companyName(),
		"country": faker.address.countryCode(),
		"website": faker.random.boolean() ? faker.internet.url() : null,
		"id": i + 1
	},
	"value": getRandomInt(MAX_TEAM_TOTAL),
	"last_submit_time": START_TIME.add(getRandomInt(5), 'minutes'),
	// FIXME Maybe used _id from json-server ?
	"id": i + 1,
}))
