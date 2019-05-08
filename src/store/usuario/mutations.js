import * as types from './types';

export const state = {
    usuario: {},
};

export const mutations = {
    [types.SET_USUARIO](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.INSERT_USUARIO](state, params) {
        // state.usuario = params
    },
    [types.REMOVE_USUARIO](state) {
        state.usuario = {}
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
    [types.SET_USUARIO_LOGIN](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.SYNC_USUARIO](state) {
        state.usuario = JSON.parse(localStorage.getItem('user'));
    },
};
