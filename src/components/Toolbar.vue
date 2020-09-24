<template>
  <div class="toolbar">
    <page-size />
    <margins />
    <typography />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSize from "./PageSize.vue";
import Margins from "./Margins.vue";
import Typography from "./Typography.vue";

export default defineComponent({
  name: "Toolbar",
  components: { PageSize, Margins, Typography }
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
