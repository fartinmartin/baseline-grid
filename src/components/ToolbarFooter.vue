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
  background: var(--white);
  padding: 2rem;
  overflow-x: hidden;
  box-shadow: 0px calc(var(--toolbar-fade) * -1px)
    calc(var(--toolbar-fade) * 1px) var(--gray-00);
  z-index: 100;
}
</style>
