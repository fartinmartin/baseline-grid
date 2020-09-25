<template>
  <div class="toolbar-wrap">
    <toolbar-header />
    <div class="toolbar">
      <page-size />
      <margins />
      <typography />
    </div>
    <toolbar-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolbarHeader from "./ToolbarHeader.vue";
import ToolbarFooter from "./ToolbarFooter.vue";
import PageSize from "./PageSize.vue";
import Margins from "./Margins.vue";
import Typography from "./Typography.vue";

export default defineComponent({
  name: "Toolbar",
  components: { ToolbarHeader, ToolbarFooter, PageSize, Margins, Typography }
});
</script>

<style lang="scss" scoped>
.toolbar-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 356px;

  max-width: min-content;
  background: var(--gray-00);
}

.toolbar {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2rem;
}
</style>
