<template>
  <panel>
    <h3>
      Lines: <span>{{ lines }}</span>
    </h3>
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./Panel.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelOutput",
  components: { Panel },
  setup() {
    const { lines } = useToolbar();

    return { lines };
  }
});
</script>

<style lang="scss" scoped></style>
