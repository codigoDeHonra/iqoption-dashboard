import * as types from './types';

export const state = {
    broker: [],
};

export const mutations = {
    [types.SET_USUARIO](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.INSERT_BROKER](state, params) {
        state.broker.push(params)
    },
    [types.REMOVE_BROKER](state) {
        state.usuario = {}
    },
    [types.SYNC_BROKER](state, data) {
        state.broker = data;
    },
    [types.UPDATE_BROKER]() {
    },
};
