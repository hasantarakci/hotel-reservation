<template>
  <div class="input">
    <h4 v-if="title" class="input-title">{{ title }}</h4>
    <input
      class="input-main"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :min="min"
      :max="max"
      v-model="innerValue"
      :onkeydown="onKeyDown"
      :disabled="disabled"
      :maxlength="maxLength"
      :readonly="readOnly"
    />
    <p class="input-msg" v-if="errorMsg">{{ msg }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      innerValue: this.value,
    };
  },
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    msg: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
    onKeyDown: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {},
  watch: {
    innerValue(newVal) {
      this.$emit('onChange', newVal);
    },
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<style lang="scss">
.input {
  position: relative;

  &-title {
    margin-top: 0;
    margin-bottom: 10px;
  }

  input[type='text'],
  input[type='number'] {
    padding: 10px;
  }

  input[type='date'] {
    padding: 8px 7px 7px;
  }

  &-main {
    width: 100%;
    box-sizing: border-box;
  }

  &-msg {
    color: #ee1919;
    font-size: 10px;
    margin: 0;
    position: absolute;
    bottom: 0;
  }
}
</style>
