import * as types from './types'
import vue from 'vue'

export const state = {
    dashboard: {
        banca:{
            total: 1000,
        },
        trades:[
            // {
            //     date: '2018-01-01',
            //     asset: 'GBP/CHF',
            //     payout: -100,
            //     investiment: 2,
            //     total: 0,
            // },
            // {
            //     date: '2016-01-01',
            //     asset: 'GBP/CHF',
            //     investiment: 2,
            //     payout: 89,
            //     total: 0,
            // },
            // {
            //     date: '2016-01-01',
            //     asset: 'GBP/CHF',
            //     investiment: 2,
            //     payout: 89,
            //     total: 0,
            // },
            // {
            //     date: '2016-01-01',
            //     asset: 'GBP/CHF',
            //     investiment: 2,
            //     payout: 89,
            //     total: 0,
            // },
            // {
            //     date: '2017-01-01',
            //     asset: 'GBP/CHF',
            //     investiment: 2,
            //     total: 0,
            //     payout: 89,
            // },
            // {
            //     date: '2017-02-01',
            //     asset: 'GBP/CHF',
            //     investiment: 2,
            //     payout: 89,
            //     total: 0,
            // },
            // {
            //     date: '2019-01-03',
            //     asset: 'GBP/CHF',
            //     investiment: 2,
            //     payout: 89,
            //     total: 0,
            // },
            {
                date: '2019-01-01',
                asset: 'GBP/CHF',
                investiment: 2,
                payout: 89,
                total: 0,
            }
        ],
        strategy:{ entry: 5 },
        sessions: [],
        meta:{
        }
    }
}

export const mutations = {
  [types.INSERT_TRADE] (state, params) {
      state.dashboard.trades.push(params)
  },
  [types.UPDATE_TRADE] (state, params) {
    vue.set(state.dashboard.trades, params.index, params)
  },
  [types.REMOVE_TRADE] (state, params) {
    vue.delete(state.dashboard.trades, params)
  },
  [types.REMOVE_ALL_TRADES] (state) {
    vue.set(state.dashboard, 'trades', [])
  },
  [types.INSERT_SESSION] (state, params) {
    let data = state.dashboard.sessions
    data.push(params)

    vue.set(state.dashboard, 'sessions', data)
  },
  [types.REMOVE_ALL_SESSION] (state) {
    vue.set(state.dashboard, 'sessions', [])
  }
}
