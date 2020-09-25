<template>
  <div class="app-wrap">
    <toolbar />
    <page-preview :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Toolbar from "./components/Toolbar.vue";
import PagePreview from "./components/PagePreview.vue";
import useToolbar from "@/state/toolbar";

@Options({
  components: {
    Toolbar,
    PagePreview
  },
  setup() {
    const { width, height } = useToolbar();
    console.log(width, height);
    return { width, height };
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.app-wrap {
  display: flex;
  min-height: 100vh;
}
</style>
