<template>
  <Calc />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Calc from "./components/Calc.vue";

@Options({
  components: {
    Calc
  }
})
export default class App extends Vue {}
</script>
