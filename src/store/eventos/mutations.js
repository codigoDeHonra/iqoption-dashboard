import * as types from './types';
import Vue from 'vue'
export const state = {
    eventos: [],
};

export const mutations = {
    [types.SET_EVENTOS](state, params) {
        Vue.set(state, 'eventos', params)
    },
    [types.SET_EVENTO](state, params) {
        state.eventos.push(params) 
        // Vue.set(state, 'eventos', params)
    },
    [types.REMOVE_EVENTO](state) {
        state.evento = {}
    },
    [types.UPDATE_EVENTO](state) {
        state.evento = {}
    },
};
