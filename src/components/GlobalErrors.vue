<template>
  <transition name="global-errors-fade">
    <div v-if="this.handleGlobalErrors.length > 0" class="center-container">
      <div id="global-errors-component">
        <ul v-for="value in handleGlobalErrors" v-bind:key="value.index">
          <li>{{value}}</li>
        </ul>
        <button @click.prevent="clearErrors">&times;</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    handleGlobalErrors: function() {
      return this.$store.state.globalErrors;
    }
  },
  methods: {
    clearErrors() {
      this.$store.state.globalErrors = [];
    }
  }
};
</script>

<style>
.center-container {
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  position: absolute;
}
#global-errors-component {
  min-height: 80px;
  min-width: 90vw;
  max-width: 90vw;
  background-color: rgb(170, 45, 45);
  color: #fff;
  border: 1px solid rgb(99, 25, 25);
  margin: 10px auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#global-errors-component ul {
  height: 100%;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-container button {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  background-color: transparent;
  outline: none;
  border: none;
  color: #fff;
  font-size: 30px;
}

.global-errors-fade-enter-active,
.global-errors-fade-leave-active {
  transition: opacity 0.5s;
}
.global-errors-fade-enter, .global-errors-fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>