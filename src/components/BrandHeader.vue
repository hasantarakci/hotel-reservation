<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header__left">
        <h2 class="header__left-title">Otel</h2>
        <div>Rezervasyon Sistemi</div>
      </div>
      <router-link class="header-right" to="/">Yeni Rezervasyon Yap</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
.header {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: sticky;
  top: 0;
  background: linear-gradient(to right, #031e30 0%, #0fc6e6 100%);
  z-index: 1;

  &-wrapper {
    height: 100px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    text-align: left;
    color: #fff;

    &-title {
      margin: 0;
    }
  }

  &-right {
    background-color: #031e30;
    color: #ffffff;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    font-size: 13.3333px;
  }
}
</style>
