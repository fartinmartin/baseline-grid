<template>
  <header class="header">
    <h1 @click="panel = 'ToolbarCalculator'" :class="{ active: isCalc }">
      Baseline Grid
    </h1>
    <span class="divider">/</span>
    <span
      @click="panel = 'ToolbarFixes'"
      :class="{ active: !isCalc, disabled: allPassing }"
    >
      Your Options
    </span>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "ToolbarHeader",
  setup() {
    const { current, isPassing } = useToolbar();
    const { panel } = toRefs(current);
    const { all: allPassing } = toRefs(isPassing);
    const isCalc = computed(() => panel.value === "ToolbarCalculator");
    return { panel, allPassing, isCalc };
  }
});
</script>

<style lang="scss" scoped>
.header {
  background: var(--white);
  padding: 2rem;
  overflow-x: hidden;
  border-bottom: 1px solid var(--gray-10);
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
