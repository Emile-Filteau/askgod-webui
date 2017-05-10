import utils, { IS_PUBLIC } from './utils'

const API_URL = utils.getApiURL()
const VALID_API_RESOURCES = [
  // Settings
  '',
  // Public related
  '/scoreboard',
  '/timeline',
  // Team related
  '/team',
  '/team/flags',
  // Admin related
  '/flags',
  '/scores',
  '/teams'
]

export default {
  fetch (thing) {
    // This is only for the public version
    if (!VALID_API_RESOURCES.includes(thing)) {
      console.error('Not a valid thing to fetch', thing)
      return false
    }
    return fetch(`${API_URL}${thing}${IS_PUBLIC ? '/index.json' : ''}`)
      .then(r => r.json())
      .then(data => data)
      .catch(e => console.log(`Fetch ${thing || '/1.0'} failed!`))
  },
  update (thing, body) {
    return fetch(`${API_URL}${thing}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
    .then(r => r)
    .catch(e => console.log(`Update ${thing} failed!`, e))
  },
  /**
   * @param {String} thing
   * @param {Object} body
   */
  post (thing, body) {
    return fetch(`${API_URL}${thing}`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(r => r)
    .catch(e => console.log(`Post ${thing} failed!`, e))
  }
}
