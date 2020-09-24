<template>
  <input
    type="number"
    :value="value"
    @change="event => $emit('update-value', event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["value"],
  model: { prop: "value", event: "updateValue" }
});
</script>

<style></style>
