import Vue from 'vue'
import '../theme/index.css' // Custom generated styles
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { store } from './store/index'
import MainLayout from './layouts/Main'
import { routeByPath } from './routes'
import { IS_PRIVATE } from './utils'
import * as actions from './store/action-types'

// on www.nsec only
const WEBSOCKET_URL = 'wss://askgod.nsec/1.0/events?type=timeline'
const ws = new WebSocket(WEBSOCKET_URL)

Vue.use(ElementUI, { locale })

// Global component
Vue.component('main-layout', MainLayout)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  store,
  computed: {
    ViewComponent () {
      const newRoute = this.$store.state.app.currentRoute
      return newRoute
        ? require('./pages/' + newRoute.component + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  },
  created () {
    // Init views data
    this.$store.dispatch('initStore')
  }
})

window.addEventListener('popstate', () => {
  let newRoute = routeByPath(window.location.pathname)
  app.$store.dispatch(actions.SET_CURRENT_ROUTE, newRoute)
})

if (IS_PRIVATE) {
  ws.onopen = (event) => {
    app.$store.dispatch('websocketEvent', {
      metadata: {
        type: 'connected'
      },
      event: event
    })
  }
  ws.onerror = (event) => {
    app.$store.dispatch('websocketEvent', {
      metadata: {
        type: 'error'
      },
      event: event
    })
  }
  ws.onmessage = (event) => {
    app.$store.dispatch('websocketEvent', JSON.parse(event.data))
  }
} else {
  const REFRESH_INTERVAL = 60 * 1000
  setInterval(() => {
    app.$store.dispatch(actions.SET_TIMELINE)
    app.$store.dispatch(actions.SET_SCOREBOARD)
  }, REFRESH_INTERVAL)
}
