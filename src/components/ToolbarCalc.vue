<template>
  <div>
    <panel-typography />
    <panel-page-size />
    <panel-margins />
    <panel-settings />
    <panel-output />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PanelSettings from "./PanelSettings.vue";
import PanelPageSize from "./PanelPageSize.vue";
import PanelMargins from "./PanelMargins.vue";
import PanelTypography from "./PanelTypography.vue";
import PanelOutput from "./PanelOutput.vue";

export default defineComponent({
  name: "Toolbar",
  components: {
    PanelSettings,
    PanelPageSize,
    PanelMargins,
    PanelTypography,
    PanelOutput
  }
});
</script>
