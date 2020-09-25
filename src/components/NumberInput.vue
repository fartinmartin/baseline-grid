<template>
  <div class="input-group">
    <label :for="id" class="label">{{ label }}</label>
    <div class="controls">
      <button
        class="button increment"
        type="button"
        :disabled="disabled || !canIncrease"
        @click="increase"
      >
        ▲
      </button>
      <button
        class="button decrement"
        type="button"
        :disabled="disabled || !canDecrease"
        @click="decrease"
      >
        ▼
      </button>
    </div>
    <div class="input">
      <input
        ref="input"
        type="number"
        :name="name"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled || (!canDecrease && !canIncrease)"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div v-if="unit" class="input-append">
      <span class="unit">{{ unit }}</span>
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

    modelValue: {
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
      return this.modelValue < this.max;
    },

    canDecrease(): boolean {
      return this.modelValue > this.min;
    }
  },

  methods: {
    change(event: object) {
      this.$emit("change", event);
    },

    decrease() {
      this.canDecrease && this.inputRef.value--;
      this.$emit("update:modelValue", this.inputRef.value);
    },

    increase() {
      this.canDecrease && this.inputRef.value++;
      this.$emit("update:modelValue", this.inputRef.value);
    }
  }
});
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  align-items: baseline;
}

.label {
  margin-right: 0.5rem;
}

.controls {
  width: 2rem;
  height: 2rem;

  display: flex;
  flex-direction: column;
  align-self: start;

  button {
    width: 2rem;
    height: 1rem;
    font-size: 0.5rem;
    border-radius: 0;

    &:nth-of-type(1) {
      border-top-left-radius: 3px;
      border-bottom: none;
    }

    &:nth-of-type(2) {
      border-bottom-left-radius: 3px;
      border-top: none;
    }
  }
}

.input {
  input {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: 7ch;
  }
  margin-right: 0.5rem;
}
</style>
