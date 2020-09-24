<template>
  <div class="input-group">
    <input :id="id" :value="value" type="radio" />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NumberInput",
  props: {
    id: String,
    value: String,
    label: String
  }
});
</script>

<style lang="scss" scoped></style>
