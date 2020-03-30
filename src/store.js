import Vue from 'vue'
import Vuex from 'vuex'
import global from './store/global/index'
import usuario from './store/usuario/index'
import dashboard from './store/dashboard/index'
import noticias from './store/noticias/index'
import category from './store/category/index'
import broker from './store/broker/index'
import asset from './store/asset/index'
import wallet from './store/wallet/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    usuario,
    dashboard,
    noticias,
    category,
    broker,
    asset,
   wallet 
  },
  debug: true,
})
