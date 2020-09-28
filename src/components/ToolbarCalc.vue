<template>
  <div>
    <panel-typography />
    <panel-page-size />
    <panel-margins />
    <panel-grid-rows />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PanelPageSize from "./PanelPageSize.vue";
import PanelMargins from "./PanelMargins.vue";
import PanelTypography from "./PanelTypography.vue";
import PanelGridRows from "./PanelGridRows.vue";

export default defineComponent({
  name: "Toolbar",
  components: {
    PanelPageSize,
    PanelMargins,
    PanelTypography,
    PanelGridRows
  }
});
</script>
