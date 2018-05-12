import * as types from './mutation-type'

const mutations = {
  [types.SET_TABBAR_ACTIVE] (state, tabbarActive) {
    state.tabbarActive = tabbarActive
  }
}
export default mutations
