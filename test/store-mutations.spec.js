import test from 'ava';
import { mutations } from '../store/index';

const {
	toggleSidebar,
	setTeams,
	setScoreboard,
	setStatus,
} = mutations;

test('toggleSidebar()', t => {
	const state = { sidebar: false };

	toggleSidebar(state);
	t.true(state.sidebar);
  
  toggleSidebar(state);
  t.false(state.sidebar);
});

test('setTeams()', t => {
	const state = { teams: [] };

	setTeams(state, [
	  {
	    "name": "NorthSec",
	    "country": "CA",
	    "website": "https://www.nsec.io",
	    "id": 1
	  }
	]);

	t.deepEqual(state.teams[0], {
		name: "NorthSec",
		country: "CA",
		website: "https://www.nsec.io",
		id: 1,
	});
});

test('setScoreboard()', t => {
		const state = { scoreboard: [] };
		
		setScoreboard(state, [
			{
				"team": {
					"name": "NorthSec",
					"country": "CA",
					"website": "https://www.nsec.io",
					"id": 1
				},
				"value": 100,
				"last_submit_time": "2018-05-04T05:58:07.054541Z"
			}
		])

		t.deepEqual(state.scoreboard[0], {
			score: 100,
			team: {
				name: "NorthSec",
				country: "CA",
				website: "https://www.nsec.io",
				id: 1,
			},
			lastFlag: "2018-05-04T05:58:07.054541Z"
		});
});


test('setStatus()', t => {
	const state = { status: {} };
	
	setStatus(state, {
		"is_admin": false,
		"is_team": false,
		"is_guest": true,
		"event_name": "NorthSec 2017",
		"flags": {
			"team_self_register": true,
			"team_self_update": true,
			"board_read_only": false,
			"board_hide_others": false
		}
	});
	
	t.deepEqual(state.status, {
		is_admin: false,
		is_team: false,
		is_guest: true,
		event_name: "NorthSec 2017",
		flags: {
			team_self_register: true,
			team_self_update: true,
			board_read_only: false,
			board_hide_others: false
		}
	});
})