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

describe('setFireworksDialog', () => {
  const state = {
    fireworksDialog: false,
    latestScore: {
      teamName: null,
      score: null,
    },
    settings: {
      animationEnabled: false,
    }
  }
  const data = {
    show: true,
    score: {
      teamName: 'foo',
      score: 2
    }
  }

  test('with animation disabled', () => {
    mutations.setFireworksDialog(state, data)
    expect(state.fireworksDialog).toBe(false)
    expect(console.warn).toHaveBeenCalled();
  })

  test('with animation enabled', () => {
    state.settings.animationEnabled = true
    mutations.setFireworksDialog(state, data)
    expect(state.latestScore).toEqual({
      teamName: 'foo',
      score: 2,
    })
  })
})
