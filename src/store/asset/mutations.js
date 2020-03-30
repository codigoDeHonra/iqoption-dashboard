import * as types from './types';

export const state = {
    asset: [],
};

export const mutations = {
    [types.SET_USUARIO](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.INSERT_ASSET](state, params) {
        state.asset.push(params)
    },
    [types.REMOVE_ASSET](state) {
        state.usuario = {}
    },
    [types.SYNC_ASSET](state, data) {
        state.asset = data;
    },
    [types.UPDATE_ASSET]() {
    },
};
