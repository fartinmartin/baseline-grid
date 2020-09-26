<template>
  <panel>
    <h3>Margins</h3>

    <number-input name="margin-top" label="Top: " v-model="top" :unit="unit" />
    <number-input
      name="margin-bottom"
      label="Bottom: "
      v-model="bottom"
      :unit="unit"
    />
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NumberInput from "./NumberInput.vue";
import Panel from "./Panel.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelMargins",
  components: { NumberInput, Panel },
  setup() {
    const { unit, top, bottom } = useToolbar();

    return { unit, top, bottom };
  }
});
</script>

<style lang="scss" scoped></style>
