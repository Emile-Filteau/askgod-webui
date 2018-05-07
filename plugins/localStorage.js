// Auto save and load vuex store data
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
      key: 'nsec-askgod',
  })(store)
}
