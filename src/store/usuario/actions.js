// import * as avaliacaoResultadosHelperAPI from '@/helpers/api/AvaliacaoResultados';
import * as types from './types'

export const dadosMenu = ({ commit }) => {
 	commit(types.SET_REGISTROS_TABELA, {})
}

export const usuario = ({ commit }, params) => {
  commit(types.SET_USUARIO, params)
}
