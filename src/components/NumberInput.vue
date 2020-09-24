<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <div class="input">
      <input
        ref="input"
        type="number"
        :name="name"
        :value="value"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled || (!canDecrease && !canIncrease)"
        @change="change"
      />
      <div v-if="unit" class="input-append">
        <span class="unit">{{ unit }}</span>
      </div>
      <div>
        <button
          class="button decrement"
          type="button"
          :disabled="disabled || !canDecrease"
          @click="decrease"
        />
        <button
          class="button increment"
          type="button"
          :disabled="disabled || !canIncrease"
          @click="increase"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NumberInput",

  props: {
    label: String,

    name: {
      type: String,
      default: undefined
    },

    unit: {
      type: String,
      default: "picas"
    },

    value: {
      type: Number,
      default: NaN
    },

    min: {
      type: Number,
      default: -Infinity
    },

    max: {
      type: Number,
      default: Infinity
    },

    step: {
      type: Number,
      default: 1
    },

    placeholder: {
      type: String,
      default: undefined
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    inputRef(): { value: number } {
      return this.$refs.input as { value: number };
    },

    canIncrease(): boolean {
      return this.value < this.max;
    },

    canDecrease(): boolean {
      return this.value > this.min;
    }
  },

  methods: {
    change(event: object) {
      this.$emit("change", event);
    },

    decrease() {
      this.canDecrease && this.inputRef.value--;
      this.change({ target: { value: this.inputRef.value } });
    },

    increase() {
      this.canDecrease && this.inputRef.value++;
      this.change({ target: { value: this.inputRef.value } });
    }
  }
});
</script>

<style lang="scss" scoped>
button {
  height: 1rem;
  width: 2rem;
}
</style>