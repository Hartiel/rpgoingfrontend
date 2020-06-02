<template>
  <div id="app">
    <!-- Show Global Errors on Screen -->
    <GlobalErrors></GlobalErrors>
    <!-- Show routed views -->
    <router-view />
  </div>
</template>

<script>
import GlobalErrors from "./components/GlobalErrors";
export default {
  components: {
    GlobalErrors
  }
};
</script>

<style>
/* FONTS */
@font-face {
  font-family: arvo;
  src: url(./assets/fonts/Arvo/Arvo-Regular.ttf);
}

@font-face {
  font-family: nunito;
  src: url(./assets/fonts/Nunito/Nunito-Regular.ttf);
}

/* ALL CSS */
* {
  font-family: nunito;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(
      135deg,
      #6187ad 21px,
      #c0c7ce 22px,
      #c0c7ce 24px,
      transparent 24px,
      transparent 67px,
      #c0c7ce 67px,
      #c0c7ce 69px,
      transparent 69px
    ),
    linear-gradient(
        225deg,
        #6187ad 21px,
        #c0c7ce 22px,
        #c0c7ce 24px,
        transparent 24px,
        transparent 67px,
        #c0c7ce 67px,
        #c0c7ce 69px,
        transparent 69px
      )
      0 64px;
  background-color: #6187ad;
  background-size: 64px 128px;
}

/* APP CSS */
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
