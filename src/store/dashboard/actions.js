import * as types from './types'

export const eventos = ({ commit }, params) => {
  commit(types.SET_EVENTO, params)
}

export const insertAction = ({ commit }, params) => {
  commit(types.INSERT_TRADE, params)
}

export const updateAction = ({ commit }, params) => {
  commit(types.UPDATE_TRADE, params)
}

export const removeAction = ({ commit }, params) => {
  commit(types.REMOVE_TRADE, params)
}
export const removeAllAction = ({ commit }) => {
  commit(types.REMOVE_ALL_TRADES)
}

export const insertSessionAction = ({ commit }, params) => {
  commit(types.INSERT_SESSION, params)
}

export const removeAllSessionAction = ({ commit }) => {
  commit(types.REMOVE_ALL_SESSION)
}

