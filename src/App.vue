<template>
  <div class="app-wrap">
    <toolbar />
    <page-preview />
  </div>
</template>

<script lang="ts">
import Toolbar from "./components/Toolbar.vue";
import PagePreview from "./components/PagePreview.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Toolbar,
    PagePreview
  }
});
</script>

<style lang="scss" scoped>
.app-wrap {
  display: flex;
  min-height: 100vh;
}
</style>
