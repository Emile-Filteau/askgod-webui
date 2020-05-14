import {mutations} from './index'

test('toggleSidebar', () => {
  const state = {
    sidebar: false
  }
  mutations.toggleSidebar(state)
  expect(state.sidebar).toBe(true)
})
