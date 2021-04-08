<template>
  <select v-model="innerValue" class="select" :name="name" :id="id" @change="onChange">
    <option value="" selected disabled>{{ placeholder }}</option>
    <option v-for="item in data" :key="item.id" :value="item.id">
      {{ item.value }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      innerValue: '',
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onChange(event) {
      this.$emit('onSelect', event.target.value);
    },
  },
  created() {
    this.innerValue = this.value;
  },
  watch: {
    value(newVal) {
      this.innerValue = newVal;
    },
  },
};
</script>

<style lang="scss">
.select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
