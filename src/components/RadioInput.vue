<template>
  <div class="input-group">
    <label>{{ label }}</label>
    <div class="radio-input" :class="{ active }">
      <div class="option" v-for="option in options" :key="option.value">
        <label class="serif">
          <input
            type="radio"
            :name="label"
            :value="option.value"
            @input="$emit('update:modelValue', $event.target.value)"
            @focus="active = true"
            @blur="active = false"
          />
          <div class="marker" :class="{ checked: option.value === modelValue }">
            {{ option.label }}
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NumberInput",
  props: {
    label: String,
    options: Array,
    modelValue: String
  },
  setup() {
    const active = ref(false);
    return { active };
  }
});
</script>

<style lang="scss" scoped>
.radio-input {
  display: flex;
  border-radius: var(--border-radius);
  border: 2px solid var(--gray-10);
  height: var(--input-height);

  &.active {
    border: 2px solid var(--active-color);
    box-shadow: 0 0 4px 4px var(--active-color-light);
  }
}

.option {
  flex: 1;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  label {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .marker {
    width: 100%;
    height: 100%;
    display: flex;

    align-items: center;
    justify-content: center;

    background: var(--gray-00);
    color: var(--gray-30);
    cursor: pointer;
    user-select: none;
  }

  .marker:not(.checked):hover {
    background: var(--gray-10);
  }

  .marker.checked {
    background: var(--white);
    color: var(--black);
  }

  &:first-of-type .marker {
    border-right: 1px solid var(--gray-10);
  }

  &:last-of-type .marker {
    border-left: 1px solid var(--gray-10);
    border-left-width: 1px;
  }
}
</style>
