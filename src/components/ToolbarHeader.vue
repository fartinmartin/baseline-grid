<template>
  <header class="header">
    <h1>Baseline Grid</h1>
    <span class="divider">/</span>
    <span>Your Options</span>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolbarHeader"
});
</script>

<style lang="scss" scoped>
.header {
  background: var(--white);
  padding: 2rem;
  overflow-x: hidden;
  box-shadow: 0px calc(var(--toolbar-fade) * 1px)
    calc(var(--toolbar-fade) * 1px) var(--gray-00);
  z-index: 100;
  display: flex;
}

.divider {
  margin: 0 0.25em;
}

span {
  font-weight: 700;
  opacity: 0.25;
}
</style>
