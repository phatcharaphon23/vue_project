import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import login from './modules/login'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,

  },
  plugins: [createPersistedState({
    key: 'stores'
  })],

})

export default store