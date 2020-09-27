<template>
  <header class="header">
    <h1 @click="currentPanel = 'ToolbarCalc'" :class="{ active: isCalc }">
      Baseline Grid
    </h1>
    <span class="divider">/</span>
    <span @click="currentPanel = 'ToolbarFixes'" :class="{ active: !isCalc }">
      Your Options
    </span>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "ToolbarHeader",
  setup() {
    const { currentPanel } = useToolbar();
    const isCalc = computed(() => currentPanel.value === "ToolbarCalc");
    return { currentPanel, isCalc };
  }
});
</script>

<style lang="scss" scoped>
.header {
  background: var(--white);
  padding: 2rem;
  overflow-x: hidden;
  border-bottom: 1px solid var(--gray-20);
  box-shadow: 0px calc(var(--toolbar-fade) * 1px)
    calc(var(--toolbar-fade) * 1px) var(--gray-00);
  z-index: 100;
  display: flex;
}

span.divider {
  margin: 0 0.25em;
  cursor: auto;
}

h1,
span {
  font-weight: 700;
  opacity: 0.25;
  transition: opacity 0.1s ease;
  cursor: pointer;
}

.active {
  opacity: 1;
}
</style>
