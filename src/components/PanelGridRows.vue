<template>
  <panel>
    <div class="optional">
      <input type="checkbox" name="grid-rows" id="" />
      <h3>Grid Rows</h3>
    </div>

    <number-input name="gutter" label="Gutter: " v-model="gutter" unit="pt" />
    <number-input name="rows" label="Rows: " v-model="rows" unit="" />
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NumberInput from "./NumberInput.vue";
import Panel from "./Panel.vue";
// import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelGridRows",
  components: { NumberInput, Panel }
});
</script>

<style lang="scss" scoped>
.optional {
  display: flex;
  align-items: center;
  input {
    margin-right: 0.5rem;
  }
}
</style>
