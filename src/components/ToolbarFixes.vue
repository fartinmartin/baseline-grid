<template>
  <div>
    <panel>
      <h1>hi</h1>
    </panel>
  </div>
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
