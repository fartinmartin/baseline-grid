<template>
  <div class="toolbar-wrap">
    <toolbar-header />
    <div class="toolbar">
      <panel-typography />
      <panel-page-size />
      <panel-margins />
      <panel-settings />
      <panel-output />
    </div>
    <toolbar-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolbarHeader from "./ToolbarHeader.vue";
import ToolbarFooter from "./ToolbarFooter.vue";
import PanelSettings from "./PanelSettings.vue";
import PanelPageSize from "./PanelPageSize.vue";
import PanelMargins from "./PanelMargins.vue";
import PanelTypography from "./PanelTypography.vue";
import PanelOutput from "./PanelOutput.vue";

export default defineComponent({
  name: "Toolbar",
  components: {
    ToolbarHeader,
    ToolbarFooter,
    PanelSettings,
    PanelPageSize,
    PanelMargins,
    PanelTypography,
    PanelOutput
  }
});
</script>

<style lang="scss" scoped>
.toolbar-wrap {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  height: 100vh;
  width: 333px;
  background: var(--gray-00);

  overflow-x: hidden;
}

.toolbar {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2rem;

  > *:last-child {
    margin-bottom: 4rem;
  }
}
</style>
