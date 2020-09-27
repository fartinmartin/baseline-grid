<template>
  <div class="toolbar-wrap">
    <toolbar-header />
    <div class="toolbar">
      <keep-alive>
        <transition :name="transition">
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
  border-right: 1px solid var(--gray-05);
}

.toolbar {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  > * {
    position: absolute;
    padding: 0 2rem;
    width: calc(333px);
    background: var(--gray-00);
    height: 100%;

    > :last-child {
      margin-bottom: 6rem;
    }
  }
}
</style>

<style lang="scss" scoped>
.slide-right {
  &-enter-active,
  &-leave-active {
    border-left: 1px solid var(--gray-05);
  }
  &-leave-active {
    transition: 0.3s;
  }
  &-enter-active {
    transition: 0.4s;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  &-enter-from {
    transform: translate(100%, 0);
  }
  &-leave-to {
    transform: translate(-100%, 0);
  }
}

.slide-left {
  &-enter-active,
  &-leave-active {
    border-right: 1px solid var(--gray-05);
  }
  &-leave-active {
    transition: 0.3s;
  }
  &-enter-active {
    transition: 0.4s;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  &-enter-from {
    transform: translate(-100%, 0);
  }
  &-leave-to {
    transform: translate(100%, 0);
  }
}

/* .slide-right-enter-from,
.slide-left-enter-from,
.slide-right-leave-to,
.slide-left-leave-to {
  opacity: 0;
} */
</style>
