<template>
  <div class="panel">
    <h3 v-if="header">{{ header }}</h3>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Panel",
  props: {
    header: String
  }
});
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 2.5rem;
}
</style>
