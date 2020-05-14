const now = new Date();

module.exports = {
	"is_admin": false,
	"is_team": true,
	"is_guest": false,
	"event_name": `NorthSec CTF ${now.getFullYear()}`,
	"flags": {
		"team_self_register": true,
		"team_self_update": true,
		"board_read_only": false,
		"board_hide_others": false
	}
}
