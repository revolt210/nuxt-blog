<template>
  <div>
    <the-header @sidenavToggle="show = !show"></the-header>
    <the-sidenav :show="show" @close="show = !show"></the-sidenav>
    <nuxt />
  </div>
</template>

<script>
  import TheHeader from "../components/Navigation/TheHeader.vue";
  import TheSidenav from "../components/Navigation/TheSidenav.vue";
  export default {
      components: {
          TheHeader,
          TheSidenav
      },
      data() {
          return {
              show: false
          }
      }
  }
</script>

<style>
  html {
    font-family: 'Open Sans', sans-serif;
  }
  body {
    margin: 0;
  }
</style>
