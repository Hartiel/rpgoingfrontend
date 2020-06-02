<template>
  <div class="middle-container">
    <div id="register-page">
      <h1>RPGoing</h1>
      <div class="nav">
        <router-link class="link" to="/login">Login</router-link>|
        <router-link class="link" to="/register">Register</router-link>
      </div>
      <ul>
        <li v-for="value in this.errors" v-bind:key="value.index">{{value}}</li>
      </ul>
      <form class="form" action>
        <input type="text" placeholder="Name" v-model="form.name" />
        <input type="email" placeholder="E-mail" v-model="form.email" />
        <input type="password" placeholder="Password" v-model="form.password" />
        <input type="password" placeholder="Confirm Password" v-model="form.c_password" />
        <button type="submit" @click.prevent="register">Register</button>
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
        name: "",
        email: "",
        password: "",
        c_password: ""
      },
      errors: {}
    };
  },
  methods: {
    register() {
      // Reseta o estado dos erros
      this.errors = [];
      // Cria variavel que recebe nome, email, senha e confirmação da senha
      let data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.c_password
      };
      // Chama axios com post enviando os dados
      this.axios
        .post("http://localhost/api/register", data)
        // Se der certo ele salva o token de acesso no localStorage, autentica o VueX, salva os dados do usuário no VueX e redireciona para a HOME
        .then(res => {
          console.log(res);
          localStorage.setItem("access_token", res.data.access_token);
          this.$store.state.isAuth = true;
          this.$store.state.me = res.data.user;
          this.$router.push({ path: "/" });
        })
        // Se não der certo ele faz o seguinte código
        .catch(res => {
          // Se houver resposta ele mostra os erros da resposta, senão ele mostra erro de servidor.
          if (res) {
            for (let k in res.response.data) {
              this.errors.push(res.response.data[k][0]);
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
.middle-container {
  max-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#register-page {
  background-image: linear-gradient(to bottom, #2b5876, #4e4376);
  display: flex;
  flex-wrap: wrap;
  width: 20rem;
  border: 1px solid transparent;
  border-radius: 15px;
  color: #fefefe;
}

#register-page ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 5px 0 5px;
  color: rgb(230, 113, 113);
  list-style: none;
}

#register-page h1 {
  width: 100%;
  margin: 25px 10px 0 10px;
}

#register-page div.nav {
  width: 100%;
  display: inline-flex;
  justify-content: center;
}

#register-page div.nav .link {
  color: #fff;
  text-decoration: none;
  margin: 0 5px;
  transition: all 0.2s;
}

#register-page div.nav .link:hover {
  color: #ffa500;
}

#register-page div.nav .link:active {
  color: #ff6347;
}

#register-page .form {
  margin: 10px 10px 25px 10px;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

#register-page .form input {
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

#register-page .form input:hover {
  border: none;
  border-bottom: 1px solid #ffa500;
  margin: 0px 10px 25px 10px;
}

#register-page .form input:focus {
  border-bottom: 1px solid #ff6347;
}

#register-page ::-webkit-input-placeholder {
  color: #fff;
  font-size: 1rem;
}

#register-page :-moz-placeholder {
  /* Firefox 18- */
  color: #fff;
  font-size: 1rem;
}

#register-page ::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
  font-size: 1rem;
}

#register-page :-ms-input-placeholder {
  color: #fff;
  font-size: 1rem;
}

#register-page .form button {
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

#register-page .form button:hover {
  cursor: pointer;
  color: #ffa500;
}

#register-page .form button:active {
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