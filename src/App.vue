<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Index from "./components/index";
import Footer from "./components/footer";
import Router from "./router";

export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
