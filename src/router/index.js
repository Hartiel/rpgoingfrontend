import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    // Rota principal Bem vindo
    path: '*',
    name: 'Welcome',
    component: () => import('../views/Login.vue')
  },
  {
    // Rota de login
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    // Rota de registro
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    // Rota de inicio quando está logado
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    // Rota de sobre quando está logado
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Antes de cada rota ele faz a verificação a seguir
router.beforeEach((to, from, next) => {
  // Verifica se o usuário não está logado no Vuex
  if (store.state.isAuth == false) {
    // Verifica se existe valor no token de acesso no localStorage
    if (localStorage.getItem('access_token')) {
      // Cria um axios com o token
      let user = axios.create({
        baseURL: 'http://localhost/api/',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
      })
      // Chama o axios com get para receber informações do usuário
      user.get('/user')
        //Salva informações no vuex e muda o estado de logado para true
        .then(res => {
          store.state.isAuth = true;
          store.state.me = res.data;
          // Verifica se a rota precisa de autenticação e redireciona para a rota desejada se precisar
          if (to.matched.some(record => record.meta.requiresAuth)) {
            next();
          }
          // Se não precisar leva de volta para o HOME
          else {
            next({ path: "/" });
          }
          // Se não conseguir achar o usuário com o token, retorna um erro na tela (PROGRAMAR)
        }).catch(res => {
          console.log(res);
        });
      // Se o token não existir no localStorage faz o código abaixo
    } else {
      // Verifica se a rota precisa de autenticação e redireciona para login se precisar
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({ path: '/login' });
      }
      // Se não precisar leva para a rota desejada
      else {
        next();
      }
    }
    // Se o usuário estiver logado no Vuex ele faz o código abaixo
  } else {
    // Verifica se a rota precisa de autenticação e redireciona para a rota desejada se precisar
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next();
    }
    // Se não precisar ele redireciona para a HOME
    else {
      next({ path: '/' });
    }
  }
});

export default router
