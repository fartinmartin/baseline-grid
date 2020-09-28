<template>
  <panel>
    <h3>Margins</h3>

    <number-input label="Top" v-model="top" />
    <number-input label="Bottom" v-model="bottom" />
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
    const { top, bottom } = useToolbar();

    return { top, bottom };
  }
});
</script>

<style lang="scss" scoped></style>
