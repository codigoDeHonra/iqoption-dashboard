import * as types from './types'
import vue from 'vue'

export const state = {
    dashboard: {
        banca:{
            total: 1000,
        } ,
        trades:[
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                total: 0,
            }
        ],
        strategy:{ entry: 5 },
        meta:{
        }
    }
}

export const mutations = {
  [types.INSERT_TRADE] (state, params) {
      state.dashboard.trades.push(params)
  },
  [types.UPDATE_TRADE] (state, params) {
    vue.set(state.eventos, params.index, params)
  },
  [types.REMOVE_TRADE] (state, params) {
    vue.delete(state.dashboard.trades, params)
  }
}
