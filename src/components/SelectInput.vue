<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <select
      :name="id"
      :id="id"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <optgroup v-for="group in data" :key="group.group">
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
    value: String,
    data: Object
  }
});
</script>

<style></style>
