const state = {
  layout: 'default',
  layoutTopBar: true,
  layoutFooter: false,
}

const getters = {
  layout: state => state.layout,
  isTopBar: state => state.layoutTopBar,
  isFooter: state => state.layoutFooter,
}

export default {
  namespaced: true,
  state,
  getters,
}
