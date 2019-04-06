import * as types from './types';
import Vue from 'vue'
export const state = {
    inscricoes: [],
};

export const mutations = {
    [types.SET_INSCRICOES](state, params) {
        Vue.set(state, 'inscricoes', params)
    },
    [types.SET_INSCRICAO](state, params) {
        let c = state.inscricoes[params.eventoId] || []
        c.push({...params})
        Vue.set(state.inscricoes, params.eventoId, c)
    },
};
