<template>
  <select
    class="form-control"
    :id="id"
    :name="name"
    :disabled="disabled"
    :required="required"
    v-model="internalValue"
    @change="onChange"
  >
    <option :value="''" disabled>{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'CustomSelectForm',
  props: {
    modelValue: [String, Number, null],
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: 'Choose' },
    options: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      internalValue: this.modelValue ?? '',
    };
  },
  watch: {
    modelValue(val) {
      this.internalValue = val ?? '';
    },
  },
  methods: {
    onChange(event) {
      let value = event.target.value;
      // Try to parse as number if possible
      const num = Number(value);
      if (!isNaN(num) && value !== '') value = num;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

