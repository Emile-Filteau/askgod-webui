import {mutations} from './index'

test('toggleSidebar', () => {
  const state = {
    sidebar: false
  }
  mutations.toggleSidebar(state)
  expect(state.sidebar).toBe(true)
})

test('setFireworksDialog', () => {
  const state = {
    fireworksDialog: false,
    latestScore: {
      teamName: null,
      score: null,
    },
  }
  const data = {
    show: true,
    score: {
      teamName: 'foo',
      score: 2
    }
  }
  mutations.setFireworksDialog(state, data)
  expect(state.fireworksDialog).toBe(true)
  expect(state.latestScore).toEqual({
    teamName: 'foo',
    score: 2,
  })
})
