<template>
  <panel>
    <h3>Typography</h3>

    <number-input
      label="Leading"
      v-model="leading"
      :step="0.1"
      freeze="points"
    />
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NumberInput from "./NumberInput.vue";
import Panel from "./Panel.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelTypography",
  components: { NumberInput, Panel },
  setup() {
    const { leading } = useToolbar();
    return { leading };
  }
});
</script>

<style lang="scss" scoped></style>
