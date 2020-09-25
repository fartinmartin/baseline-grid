<template>
  <panel>
    <h3>Typography</h3>
    <number-input id="fontSize" label="Font Size: " unit="pt" :value="size" />
    <number-input id="leading" label="Leading: " unit="pt" :value="leading" />
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NumberInput from "./NumberInput.vue";
import Panel from "./Panel.vue";

export default defineComponent({
  name: "Margins",
  components: { NumberInput, Panel }
});
</script>

<style lang="scss" scoped></style>
