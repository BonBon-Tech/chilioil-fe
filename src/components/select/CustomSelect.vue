<template>
  <div>
    <select
        class="form-control"
        :id="id"
        :name="name"
        :disabled="disabled"
        :required="required"
    ></select>
  </div>
</template>

<script>
import $ from 'jquery';
import 'select2/dist/js/select2.full';
import 'select2/dist/css/select2.min.css';

export default {
  name: 'CustomSelect',
  emits: ['update:modelValue', 'select'],
  props: {
    modelValue: [String, Array],
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    settings: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      select2: null,
    };
  },
  watch: {
    options: {
      handler(val) {
        this.setOptions(val);
      },
      deep: true,
    },
    modelValue: {
      handler(val) {
        this.setValue(val);
      },
      deep: true,
    },
  },
  methods: {
    setOptions(options = []) {
      const select = this.select2;
      if (!select) return;

      select.empty(); // remove existing options
      select.select2({
        placeholder: this.placeholder,
        ...this.settings,
        data: options,
      });

      this.setValue(this.modelValue);
    },
    setValue(value) {
      const select = this.select2;
      if (!select) return;

      if (Array.isArray(value)) {
        select.val([...value]);
      } else {
        select.val([value]);
      }
      select.trigger('change');
    },
  },
  mounted() {
    this.select2 = $(this.$el).find('select');

    this.select2
        .select2({
          placeholder: this.placeholder,
          ...this.settings,
          data: this.options,
        })
        .on('select2:select select2:unselect', (event) => {
          this.$emit('update:modelValue', this.select2.val());
          this.$emit('select', event?.params?.data);
        });

    this.setValue(this.modelValue);
  },
  beforeUnmount() {
    // Only destroy if select2 was initialized and has data
    if (this.select2 && this.select2.data('select2')) {
      this.select2.select2('destroy');
    }
  },
};
</script>
