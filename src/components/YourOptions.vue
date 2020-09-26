<template>
  <div class="your-options-wrap"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "YourOptions",
  components: {}
});
</script>

<style lang="scss" scoped>
.your-options-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 333px;
  background: var(--gray-00);

  overflow-x: hidden;
}
</style>
