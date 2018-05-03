export const state = () => ({
  sidebar: false,
  teams: [
    {
      score: 92,
      name: 'Team 1',
      country: 'CAD',
      lastFlag: '2 hours ago',
    },
    {
      score: 42,
      name: 'Team 2',
      country: 'US',
      lastFlag: '4 hours ago',
    },
    {
      score: 22,
      name: 'Team 3',
      country: 'US',
      lastFlag: '6 hours ago',
    }
  ]
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
