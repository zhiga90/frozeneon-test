import router from '@/router'

const state = {}

const actions = {
  /**
   * Сам поиск это переход на страницу с результатами поиска
   * @param {Object} context - vuex context
   * @param {Object} payloads - vuex payloads
   * @param {string} payloads.text
   * @param {number} [payloads.page=1]
   * @param {number} [payloads.perPage=10]
   * @param {string} payloads.packageName
   */
  toSearchResults(context, { text, page, perPage, packageName }) {
    let routeName = ''
    let query = {}
    if (!text) {
      routeName = 'home'
    } else {
      routeName = 'search-results'
      query = {
        t: text,
        p: page || 1,
        pp: perPage || 10,
      }
      if (packageName) query.n = packageName
    }
    router.push({ name: routeName, query }).catch(() => {})
  },
}

export default {
  namespaced: true,
  state,
  actions,
}
