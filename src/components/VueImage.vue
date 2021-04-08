<template>
  <div :class="wrapperClass">
    <img :src="src" />
  </div>
</template>

<script>
export default {
  props: {
    wrapperClass: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
};
</script>
