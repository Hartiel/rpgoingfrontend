import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations';
// import getters from './getters';
// import actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    me: {},
    globalErrors: []
  },
  // mutations,
  // actions,
  // getters,
  // modules: {
  // }
})
