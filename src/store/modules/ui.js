const state = {
  layout: 'default',
  layoutTopBar: true,
  layoutFooter: true,
  isLayoutContainer: true,
}

const getters = {
  layout: state => state.layout,
  isTopBar: state => state.layoutTopBar,
  isFooter: state => state.layoutFooter,
  isLayoutContainer: state => state.isLayoutContainer,
}

export default {
  namespaced: true,
  state,
  getters,
}
