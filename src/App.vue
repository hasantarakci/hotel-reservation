<template>
  <div id="app">
    <BrandHeader />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="router-container">
      <router-view />
    </div>
    <BrandFooter />
  </div>
</template>
<script>
import BrandHeader from '@/components/BrandHeader.vue';
import BrandFooter from '@/components/BrandFooter.vue';

export default {
  components: {
    BrandHeader,
    BrandFooter,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 375px;
  color: #2c3e50;

  .router-container {
    padding: 20px 10px;
    min-height: calc(100vh - 200px);
    box-sizing: border-box;
    width: 100%;
    max-width: 1020px;
    margin: auto;
  }

  button {
    border: none;
    background-color: #031e30;
    color: #ffffff;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
