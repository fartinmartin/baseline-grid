<template>
  <div class="input-group">
    <label class="label">{{ label }}</label>
    <div class="number-input" :class="{ active }">
      <div class="controls">
        <button
          class="button increment"
          type="button"
          tabindex="-1"
          :disabled="disabled || !canIncrease"
          @click="increase"
        >
          <img src="@/assets/images/arrow.svg" />
        </button>
        <button
          class="button decrement"
          type="button"
          tabindex="-1"
          :disabled="disabled || !canDecrease"
          @click="decrease"
        >
          <img src="@/assets/images/arrow.svg" />
        </button>
      </div>
      <input
        class="number-input-field"
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
      <select-input
        v-model:selected="unit"
        :options="unitPresets"
        :freeze="freeze"
        :tabindex="-1"
        append
      />
      <!-- @click="!freeze ? (active = true) : null" -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import unitPresets from "@/assets/data/unit-presets.json";
import SelectInput from "./SelectInput.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "NumberInput",
  components: { SelectInput },
  props: {
    label: String,
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
    },
    freeze: {
      type: String
    }
  },
  setup(props, { emit }) {
    const { unit } = useToolbar();
    const inputRef = (ref(null) as unknown) as { value: HTMLInputElement };
    const canIncrease = computed(() => props.modelValue < props.max);
    const canDecrease = computed(() => props.modelValue > props.min);
    const name = computed(() => props.modelValue.toString().toLowerCase());
    const active = ref(false);

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

    // if buttons are clicked OR input:focus OR select is used, set active to true
    // if anything else is clicked set active to false
    // if input:invalid deal with red styles

    return {
      inputRef,
      canIncrease,
      canDecrease,
      change,
      increase,
      decrease,
      unit,
      unitPresets,
      name,
      active
    };
  }
});
</script>

<style lang="scss" scoped>
.number-input {
  display: flex;
  border-radius: var(--border-radius);
  border: 2px solid var(--gray-20);

  &.active {
    border: 2px solid var(--active-color);
    box-shadow: 0 0 4px 4px var(--active-color-light);
  }

  > .input-group {
    margin-top: 0;
  }
}

.controls {
  width: var(--input-height);
  height: var(--input-height);

  display: flex;
  flex-direction: column;

  .button {
    width: var(--input-height);
    height: calc(var(--input-height) / 2);
    font-size: 0.75rem;
    border: none;

    display: grid;
    place-items: center;

    img {
      width: 1rem;
      height: 1rem;
    }

    &.increment {
      border-top-left-radius: var(--border-radius);
      border-bottom: none;

      img {
        transform: rotate(180deg);
      }
    }

    &.decrement {
      border-bottom-left-radius: var(--border-radius);
      border-top: none;
    }
  }
}

.number-input-field {
  border: 2px solid var(--gray-20);
  border-top: none;
  border-bottom: none;

  padding: 0 1rem;
  text-align: right;
  flex: 1 1 auto;
  width: 7ch;

  &:invalid {
    box-shadow: none;
  }
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
