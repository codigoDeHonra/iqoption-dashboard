import * as types from './types';

export const state = {
    wallet: [],
};

export const mutations = {
    [types.SET_USUARIO](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.INSERT_WALLET](state, params) {
        state.wallet.push(params)
    },
    [types.REMOVE_WALLET](state) {
        state.usuario = {}
    },
    [types.SYNC_WALLET](state, data) {
        state.wallet = data;
    },
    [types.UPDATE_WALLET]() {
    },
};
