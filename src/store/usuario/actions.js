import * as types from './types';

export const  setUsuarioAction = ({ commit }, params) => {
    commit(types.SET_USUARIO, params);
};

export const  removeUsuarioAction = ({ commit }) => {
    commit(types.REMOVE_USUARIO, {});
};
