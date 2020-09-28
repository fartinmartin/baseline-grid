<template>
  <div class="fixes-wrap">
    <h2>hi</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "ToolbarFixes",
  setup() {
    const { currentPanel } = useToolbar();
    return { currentPanel };
  }
});
</script>

<style lang="scss" scoped>
.fixes-wrap {
  padding: 2rem;
}
</style>
