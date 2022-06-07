const state = {
  layout: 'default',
}

const getters = {
  layout: state => state.layout,
}

export default {
  namespaced: true,
  state,
  getters,
}
