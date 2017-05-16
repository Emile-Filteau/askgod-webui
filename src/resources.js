import utils, { IS_PRIVATE } from './utils'

const API_URL = utils.getApiURL()
const VALID_API_RESOURCES = [
  // Status
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
      console.error('Not a valid resource', thing)
      return false
    }
    return fetch(`${API_URL}${thing}${!IS_PRIVATE ? '/index.json' : ''}`)
      .then(r => r.json())
      .then(data => data)
      .catch(e => console.log(`Fetch ${thing || 'status'} failed!`))
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
