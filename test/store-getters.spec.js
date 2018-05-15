import test from 'ava';
import { getters } from '../store/index';


test('menuItems does not contain submitFlag menu when not a team ', t => {
	const state = {
		app: {
			items: [
				{to: '/a'},
				{to: '/submit-flag'},
				{to: '/b'},
			],
		},
		status: {
			is_team: false,
		} 
  };

	t.is(getters.menuItems(state).length, 2);
	
	state.status.is_team = true;
	
	t.is(getters.menuItems(state).length, 3);
});