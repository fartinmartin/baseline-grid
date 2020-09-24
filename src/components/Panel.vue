<template>
  <div class="panel">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Panel"
});
</script>

<style lang="scss" scoped></style>
