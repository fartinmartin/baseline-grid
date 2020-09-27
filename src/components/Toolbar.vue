<template>
  <div class="toolbar-wrap">
    <toolbar-header />
    <div class="toolbar">
      <keep-alive>
        <transition :name="transition" mode="out-in">
          <component :is="currentPanel"></component>
        </transition>
      </keep-alive>
    </div>
    <toolbar-footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ToolbarHeader from "./ToolbarHeader.vue";
import ToolbarFooter from "./ToolbarFooter.vue";
import ToolbarCalc from "./ToolbarCalc.vue";
import ToolbarFixes from "./ToolbarFixes.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "Toolbar",
  components: {
    ToolbarHeader,
    ToolbarFooter,
    ToolbarCalc,
    ToolbarFixes
  },
  setup() {
    const { currentPanel } = useToolbar();
    const transition = computed(() =>
      currentPanel.value === "ToolbarCalc" ? `slide-left` : `slide-right`
    );
    return { currentPanel, transition };
  }
});
</script>

<style lang="scss" scoped>
.toolbar-wrap {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  height: 100vh;
  width: 333px;
  background: var(--gray-00);

  overflow-x: hidden;
}

.toolbar {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2rem;

  > *:last-child {
    margin-bottom: 4rem;
  }
}
</style>

<style lang="scss" scoped>
.slide-right-leave-active,
.slide-right-enter-active {
  transition: 0.3s;
}
.slide-right-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(-100%, 0);
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: 0.3s;
}
.slide-left-enter {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(100%, 0);
}

/* .slide-right-enter-from,
.slide-left-enter-from,
.slide-right-leave-to,
.slide-left-leave-to {
  opacity: 0;
} */
</style>
