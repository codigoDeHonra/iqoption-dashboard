import * as types from './types';

export const  syncEventosAction = ({ commit }) => {
    commit(types.SET_EVENTOS,[
        {
            nome: 'Mobilização: Avanços da Pauta Municipalista',
            data: '11:09 PM - 1 Jan 2016',
            descricao: 'Convocamos todos os municipalistas a estarem em Brasília nos dias 19 e 20 de novembro para uma grande mobilização municipalista. Convocamos todos os municipalistas a estarem em Brasília nos dias 19 e 20 de novembro para uma grande mobilização municipalista. '
        }
    ]
    );
};

export const  setEventoAction = ({ commit }, params) => {
    commit(types.SET_EVENTO, params);
};

export const  updateEventosAction = ({ commit }, params) => {
    commit(types.SET_EVENTOS, params);
};

export const  removeEventosAction = ({ commit }) => {
    commit(types.REMOVE_EVENTOS, {});
};
