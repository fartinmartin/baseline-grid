<template>
  <div class="input-group">
    <label :for="name" class="label">{{ label }}</label>
    <div class="number-wrap">
      <div class="controls">
        <button
          class="button increment"
          type="button"
          tabindex="-1"
          :disabled="disabled || !canIncrease"
          @click="increase"
        >
          ▲
        </button>
        <button
          class="button decrement"
          type="button"
          tabindex="-1"
          :disabled="disabled || !canDecrease"
          @click="decrease"
        >
          ▼
        </button>
      </div>
      <div class="input">
        <input
          ref="inputRef"
          type="number"
          :id="name"
          :name="name"
          :min="min"
          :max="max"
          :step="step"
          :placeholder="placeholder"
          :disabled="disabled || (!canDecrease && !canIncrease)"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
      <div v-if="unit" class="input-append">
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "NumberInput",
  props: {
    label: String,

    name: {
      type: String,
      required: true,
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
      default: 1
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
  setup(props, { emit }) {
    const inputRef = (ref(null) as unknown) as { value: HTMLInputElement };
    const canIncrease = computed(() => props.modelValue < props.max);
    const canDecrease = computed(() => props.modelValue > props.min);

    const change = (event: InputEvent) => emit("change", event);

    const decrease = (event: KeyboardEvent) => {
      if (!canDecrease.value) return;
      const stepFactor = event.shiftKey ? 10 : 1;

      const newValue: number =
        Math.round(
          (+inputRef.value.value - props.step * stepFactor + Number.EPSILON) *
            10000
        ) / 10000;

      emit("update:modelValue", newValue);
    };

    const increase = (event: KeyboardEvent) => {
      if (!canIncrease.value) return;
      const stepFactor = event.shiftKey ? 10 : 1;
      const newValue: number =
        Math.round(
          (+inputRef.value.value + props.step * stepFactor + Number.EPSILON) *
            10000
        ) / 10000;

      emit("update:modelValue", newValue);
    };

    return {
      inputRef,
      canIncrease,
      canDecrease,
      change,
      increase,
      decrease
    };
  }
});
</script>

<style lang="scss" scoped>
.number-wrap {
  display: flex;
  align-items: baseline;
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
      border-top-left-radius: var(--border-radius);
      border-bottom: none;
    }

    &:nth-of-type(2) {
      border-bottom-left-radius: var(--border-radius);
      border-top: none;
    }
  }
}

.input {
  input {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    text-align: right;
    padding-right: 0.5rem;
    width: 100%;
  }
  margin-right: 0.5rem;
}

/* Remove number input controls */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
