<template>
  <footer class="footer">
    <span>
      Made by
      <a
        href="http://martinlindberg.me"
        target="_blank"
        rel="noopener noreferrer"
      >
        Martin Lindberg
      </a>
    </span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolbarFooter"
});
</script>

<style lang="scss" scoped>
.footer {
  padding: 2rem;
}
</style>
