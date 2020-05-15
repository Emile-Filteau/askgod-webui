import {mutations} from './index'

console.warn = jest.fn()
console.debug = jest.fn()

describe('toggle', () => {
  test('drawer component', () => {
    const state = {
      app: {
        drawer: false
      }
    }
    mutations.toggle(state, 'drawer')
    expect(state.app.drawer).toBe(true)
  })
})

describe('addScore', () => {
  const team = {
    team: {
      id: 42,
      country: 'ca',
      name: 'ACME',
    },
    score: [],
  };
  const state = {
    latestScore: {
      team: null,
      score: null,
    },
    scoreboard: [team],
    timeline: [team],
  }
  const data = {
    metadata: {
      score: {value: 6},
      teamid: 42
    }
  }

  test('store last score info', () => {
    mutations.addScore(state, data)
    expect(state.latestScore).toEqual({
      team: {
        id: 42,
        country: 'ca',
        name: 'ACME',
      },
      score: 6,
    })
  })
})
