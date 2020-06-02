import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  mounted() {
    axios.defaults.withCredentials = true;
    axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
    axios.get('http://localhost/sanctum/csrf-cookie').catch(res => { store.state.globalErrors.push(res); });
  },
  render: h => h(App)
}).$mount('#app')
