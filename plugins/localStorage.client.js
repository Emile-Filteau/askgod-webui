// Auto save and load vuex store data
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
      key: 'nsec-askgod',
      paths: [
        'app.drawer',
        'settings.autoRefresh',
        'settings.theme',
        'settings.animationEnabled',
      ]
  })(store)
}
