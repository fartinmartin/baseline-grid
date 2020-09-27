<template>
  <footer class="footer-wrap">
    <panel-output />
    <div class="footer">
      <span>
        Made by
        <a
          href="http://martinlindberg.me"
          target="_blank"
          rel="noopener noreferrer"
          >Martin Lindberg</a
        >.
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PanelOutput from "./PanelOutput.vue";

export default defineComponent({
  name: "ToolbarFooter",
  components: { PanelOutput }
});
</script>

<style lang="scss" scoped>
.footer-wrap {
  background: var(--white);
  box-shadow: 0px calc(var(--toolbar-fade) * -1px)
    calc(var(--toolbar-fade) * 1px) var(--gray-00);
  z-index: 100;
}

.footer {
  padding: 2rem;
}
</style>
