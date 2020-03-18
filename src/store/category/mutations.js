import * as types from './types';

export const state = {
    category: [],
};

export const mutations = {
    [types.SET_USUARIO](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.INSERT_CATEGORY](state, params) {
        state.category.push(params)
    },
    [types.REMOVE_USUARIO](state) {
        state.usuario = {}
    },
    [types.SYNC_CATEGORY](state, data) {
        state.category = data;
    },
    [types.UPDATE_CATEGORY]() {
    },
};
