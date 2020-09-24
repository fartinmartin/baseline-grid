<template>
  <div class="toolbar">
    <page-size />
    <!-- <margins />
    <typography /> -->
  </div>

  <page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Page from "./Page.vue";
import PageSize from "./PageSize.vue";
// import Margins from "./Margins.vue";
// import Typography from "./Typography.vue";

export default defineComponent({
  name: "Calc",
  components: { Page, PageSize },
  // Margins, Typography
  data: () => ({
    unit: "pt",
    fontSize: 12,
    leading: 14.4
  })
});
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;
}
</style>
