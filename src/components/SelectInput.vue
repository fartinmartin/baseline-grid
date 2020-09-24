<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <select
      :name="id"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <optgroup v-for="group in options" :key="group.group">
        <option
          v-for="preset in group.presets"
          :key="preset.id"
          :value="preset.id"
          :disabled="preset.disabled"
        >
          {{ preset.name }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NumberInput",
  props: {
    id: String,
    label: String,
    modelValue: String,
    options: Object
  }
});
</script>

<style></style>
