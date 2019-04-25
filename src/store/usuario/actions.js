import * as types from './types';
import * as usuario from '@/api/usuario'
import router from '../../router'

export const  setUserLoginAction = ({ commit }, params) => {

    usuario.login(params)
        .then((response) => {
            const { data } = response
            commit(types.SET_USUARIO_LOGIN, data)
            router.push('/dashboard')
        })
        .catch((r)=> {
            console.log('teste', r)
        });
};

export const  setUsuarioAction = ({ commit }, params) => {
    commit(types.SET_USUARIO, params);
};

export const  syncUsuarioAction = ({ commit }, params) => {
    commit(types.SYNC_USUARIO, params);
};

export const  removeUsuarioAction = ({ commit }) => {
    commit(types.REMOVE_USUARIO, {});
};
