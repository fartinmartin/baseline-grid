<template>
  <toolbar />
  <page />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Toolbar from "./components/Toolbar.vue";
import Page from "./components/Page.vue";

@Options({
  components: {
    Toolbar,
    Page
  }
})
export default class App extends Vue {}
</script>
