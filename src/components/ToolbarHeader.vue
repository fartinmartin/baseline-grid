<template>
  <header class="header">
    <h1 @click="currentPanel = 'ToolbarCalculator'" :class="{ active: isCalc }">
      Baseline Grid
    </h1>
    <span class="divider">/</span>
    <span
      @click="currentPanel = 'ToolbarFixes'"
      :class="{ active: !isCalc, disabled: isPassing }"
    >
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
    const { currentPanel, isPassing } = useToolbar();
    const isCalc = computed(() => currentPanel.value === "ToolbarCalculator");
    return { currentPanel, isPassing, isCalc };
  }
});
</script>

<style lang="scss" scoped>
.header {
  background: var(--white);
  padding: 2rem;
  overflow-x: hidden;
  border-bottom: 1px solid var(--gray-10);
  /* box-shadow: 0px calc(var(--toolbar-fade) * 1px)
    calc(var(--toolbar-fade) * 1px) var(--gray-00); */
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

.disabled {
  pointer-events: none;
}
</style>
