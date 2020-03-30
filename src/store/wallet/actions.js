import * as types from './types';
import * as wallet from '@/api/wallet'
//import router from '../../router'

// export const  setUserLoginAction = ({ commit }, params) => {

//     usuario.login(params)
//         .then((response) => {
//             const { data } = response
//             commit(types.SET_USUARIO_LOGIN, data)
//             commit('noticias/SET_DADOS', {
//                 ativo: true,
//                 color: 'green',
//                 text: 'Bem vindo!',
//             },
//             { root: true });
//             router.push('/dashboard')
//         })
//         .catch((r)=> {
//             console.log('teste', r)
//             commit('noticias/SET_DADOS', {
//                 ativo: true,
//                 color: 'red',
//                 text: 'Erro ao tentar efetur login!',
//             },
//             { root: true });
//         });
// };

export const  insertAction = ({ commit }, params) => {

    wallet.insert(params)
        .then((response) => {
            const { data } = response
            commit(types.INSERT_WALLET, data)
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'green',
                text: 'Salvo!',
            },
            { root: true });
        })
        .catch((r)=> {
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'red',
                text: 'Erro',
            },
            { root: true });
        });
};

// export const  setUsuarioAction = ({ commit }, params) => {
//     commit(types.SET_USUARIO, params);
// };

export const syncAction = ({ commit }, params) => {
    wallet.sync(params)
        .then((response) => {
            commit(types.SYNC_WALLET, response.data);
        })
        .catch(()=> { })
};

export const  removeAction = ({ commit }, params) => {
    wallet.remove(params._id)
        .then(() => {
            commit(types.REMOVE_WALLET);
        })
        .catch(()=> { })

};

export const  updateAction = ({ commit }, params) => {

    wallet.update(params)
        .then((response) => {
            const { data } = response
            commit(types.UPDATE_WALLET, data)
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'green',
                text: 'Salvo!',
            },
            { root: true });
        })
        .catch((r)=> {
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'red',
                text: 'Erro',
            },
            { root: true });
        });
};
