<template>
  <div class="middle-center-container">
    <div id="login-page">
      <h1>RPGoing</h1>
      <div class="nav">
        <router-link class="link" to="/login">Login</router-link>|
        <router-link class="link" to="/register">Register</router-link>
      </div>
      <ul>
        <li v-for="value in this.errors" v-bind:key="value.index">{{value}}</li>
      </ul>
      <form class="form" action>
        <input class="focus-input100" type="email" placeholder="E-mail" v-model="form.email" />
        <input type="password" placeholder="Password" v-model="form.password" />
        <button type="submit" @click.prevent="login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: []
    };
  },
  methods: {
    // Authenticate users
    login() {
      // Reseta o estado dos erros
      this.errors = [];
      // Cria uma variavel para armazenar o email e a senha digitados
      let data = {
        email: this.form.email,
        password: this.form.password
      };
      //chama o axios com post passando os dados
      this.axios
        .post("http://localhost/api/login", data)
        //Se der certo salva o token de acesso no localStorage, troca a autenticação do VueX para true, salva os dados do usuário no VueX e redireciona para a HOME.
        .then(res => {
          console.log(res);
          localStorage.setItem("access_token", res.data.access_token);
          this.$store.state.isAuth = true;
          this.$store.state.me = res.data.user;
          this.$router.push({ path: "/" });
        })
        // Se der errado retorna os erros que aconteceram.
        .catch(res => {
          // Se tiver retorno mostra os erros na tela, senão mostra erro de servidor.
          if (res) {
            for (let k in res.response.data.message) {
              this.errors.push(res.response.data.message[k]);
            }
          } else {
            this.errors.push("Server error. Try later please!");
          }
        });
    }
  }
};
</script>

<style>
.middle-center-container {
  max-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#login-page {
  background-image: linear-gradient(to bottom, #2b5876, #4e4376);
  display: flex;
  flex-wrap: wrap;
  width: 20rem;
  border: 1px solid transparent;
  border-radius: 15px;
  color: #fefefe;
}

#login-page ul {
  display: flex;
  flex-flow: column;
  margin: 10px 5px 0 5px;
  color: rgb(230, 113, 113);
  list-style: none;
}

#login-page h1 {
  width: 100%;
  margin: 25px 10px 0 10px;
}

#login-page div.nav {
  width: 100%;
  display: inline-flex;
  justify-content: center;
}

#login-page div.nav .link {
  color: #fff;
  text-decoration: none;
  margin: 0 5px;
  transition: all 0.2s;
}

#login-page div.nav .link:hover {
  color: #ffa500;
}

#login-page div.nav .link:active {
  color: #ff6347;
}

#login-page .form {
  margin: 10px 10px 25px 10px;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

#login-page .form input {
  padding: 0 0 5px 0;
  color: #fff;
  border: none;
  background: transparent;
  border-bottom: 1px solid #fff;
  outline: none;
  width: 100%;
  margin: 0px 10px 25px 10px;
  transition: all 0.2s;
}

#login-page .form input:hover {
  border: none;
  border-bottom: 1px solid #ffa500;
  margin: 0px 10px 25px 10px;
}

#login-page .form input:focus {
  border-bottom: 1px solid #ff6347;
}

#login-page ::-webkit-input-placeholder {
  color: #fff;
  font-size: 1rem;
}

#login-page :-moz-placeholder {
  /* Firefox 18- */
  color: #fff;
  font-size: 1rem;
}

#login-page ::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
  font-size: 1rem;
}

#login-page :-ms-input-placeholder {
  color: #fff;
  font-size: 1rem;
}

#login-page .form button {
  background: transparent;
  border: 0;
  color: #fff;
  width: 100%;
  margin: 10px 10px 0 10px;
  font-size: 1rem;
  text-align: center;
  justify-content: center;
  transition: all 0.2s;
  outline: none;
}

#login-page .form button:hover {
  cursor: pointer;
  color: #ffa500;
}

#login-page .form button:active {
  color: #ff6347;
}

body {
  background-image: url("../assets/img/background.jpg");
  background-repeat: no-repeat;
  background-size: 200rem;
  background-position: 20% 15%;
}

/* RESPONSIVE MOBILE */
@media (max-width: 700px) {
  body {
    background-image: url("../assets/img/background.jpg");
    background-size: 100rem;
    background-position: 30% 15%;
  }
}

/* REPONSIVE MEDIUM */
@media (min-width: 701px) and (max-width: 1440px) {
  body {
    background-image: url("../assets/img/background.jpg");
    background-size: 150rem;
  }
}
</style>