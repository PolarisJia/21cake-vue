import * as types from './mutation-type'

export const reset = function ({commit}) {
  commit(types.SET_TABBAR_ACTIVE, {})
}
