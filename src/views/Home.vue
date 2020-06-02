<template>
  <div id="home-page">
    <div class>teste</div>
    <div>{{this.$store.state.me}}</div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style>
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
</style>
