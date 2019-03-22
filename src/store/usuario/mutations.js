import * as types from './types'

export const state = {
  usuario: {}
}

export const mutations = {
  [types.SET_USUARIO] (state, params) {
    state.usuario = params
  }
}
