<template>
  <panel>
    <h2>Margins</h2>
    <number-input
      id="marginTop"
      label="Top: "
      :unit="unit"
      :value="marginTop"
    />

    <number-input
      id="marginBottom"
      label="Bottom: "
      :unit="unit"
      :value="marginBottom"
    />
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
