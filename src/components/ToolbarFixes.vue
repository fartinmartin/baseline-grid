<template>
  <panel>
    <h1>hi</h1>
    <button @click="currentPanel = 'ToolbarCalc'">wait, go back</button>
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./Panel.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "ToolbarFixes",
  components: { Panel },
  setup() {
    const { currentPanel } = useToolbar();
    return { currentPanel };
  }
});
</script>
