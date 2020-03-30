import * as types from './types';
import * as asset from '@/api/asset'
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

    asset.insert(params)
        .then((response) => {
            const { data } = response
            commit(types.INSERT_ASSET, data)
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
    asset.sync(params)
        .then((response) => {
            commit(types.SYNC_ASSET, response.data);
        })
        .catch(()=> { })
};

export const  removeAction = ({ commit }, params) => {
    asset.remove(params._id)
        .then(() => {
            commit(types.REMOVE_ASSET);
        })
        .catch(()=> { })

};

export const  updateAction = ({ commit }, params) => {

    asset.update(params)
        .then((response) => {
            const { data } = response
            commit(types.UPDATE_ASSET, data)
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
