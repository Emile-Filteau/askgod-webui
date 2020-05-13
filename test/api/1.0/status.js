const now = new Date();

module.exports = {
	"is_admin": false,
	"is_team": false,
	"is_guest": true,
	"event_name": `NorthSec ${now.getFullYear()}`,
	"flags": {
		"team_self_register": true,
		"team_self_update": true,
		"board_read_only": false,
		"board_hide_others": false
	}
}
