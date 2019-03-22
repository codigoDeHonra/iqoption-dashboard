// import * as avaliacaoResultadosHelperAPI from '@/helpers/api/AvaliacaoResultados';
import * as types from './types'

export const eventos = ({ commit }, params) => {
  commit(types.SET_EVENTO, params)
}

export const insertAction = ({ commit }, params) => {
  commit(types.INSERT_TRADE, params)
}

export const update = ({ commit }, params) => {
  commit(types.UPDATE_EVENTO, params)
}

export const removeAction = ({ commit }, params) => {
  commit(types.REMOVE_TRADE, params)
}
