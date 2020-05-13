const faker = require('faker')
const moment = require('moment')

faker.seed(666);

const TOTAL_FLAG_COUNT = 50
const MAX_FLAG_VALUE = 10


function getRandomInt(max = 0) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Array.from({length: TOTAL_FLAG_COUNT}, (_, i) => ({
		"flag": "FLAG-" + faker.random.uuid(),
		"value": getRandomInt(MAX_FLAG_VALUE),
		"return_string": faker.company.catchPhrase(),
		"description": faker.hacker.phrase(),
		"tags": {
			"author": `author:${faker.internet.userName()}`,
			"lxc": `lxc:ctn-${faker.internet.userName()}-challenge`,
		},
		"id": i
}))
