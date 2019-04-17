// import * as API from '@/api/http'
import * as trade from '@/api/trade'
import * as types from './types'

export const eventos = ({ commit }, params) => {
  commit(types.SET_EVENTO, params)
}
export const syncTradesAction = ({ commit }) => {

    trade.sync()
        .then((response) => {
            const { data } = response;

            commit(types.SYNC_TRADES, data);
        })
        .catch((r)=>{
            console.log('teste', r);
        });
}

export const insertAction = ({ commit }, params) => {

    trade.insert(params)
        .then((response) => {
            const data = response.data;

            commit(types.INSERT_TRADE, params);
        })
        .catch((r)=>{
            console.log('teste', r);
        });
}

export const updateAction = ({ commit }, params) => {
  commit(types.UPDATE_TRADE, params)
}

export const removeAction = ({ commit }, params) => {
    trade.remove(params._id)
        .then((response) => {
            const { data } = response
              commit(types.REMOVE_TRADE, params)
        })
        .catch((r)=>{
            console.log('teste', r);
        });

}
export const removeAllAction = ({ commit }) => {
  commit(types.REMOVE_ALL_TRADES)
}

export const insertSessionAction = ({ commit }, params) => {
  commit(types.INSERT_SESSION, params)
}

export const removeAllSessionAction = ({ commit }) => {
  commit(types.REMOVE_ALL_SESSION)
}

