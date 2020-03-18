import * as types from './types';
import * as category from '@/api/category'
import router from '../../router'

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

    category.insert(params)
        .then((response) => {
            const { data } = response
            commit(types.INSERT_CATEGORY, data)
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

export const  syncAction = ({ commit }, params) => {
    category.sync(params)
        .then((response) => {
            commit(types.SYNC_CATEGORY, response.data);
        })
        .catch(()=> { })
};

export const  removeAction = ({ commit }, params) => {
    category.remove(params._id)
        .then(() => {
            commit(types.REMOVE_CATEGORY);
        })
        .catch(()=> { })

};

export const  updateAction = ({ commit }, params) => {

    category.update(params)
        .then((response) => {
            const { data } = response
            commit(types.UPDATE_CATEGORY, data)
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
