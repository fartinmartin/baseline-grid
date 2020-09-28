<template>
  <panel>
    <div class="optional">
      <input type="checkbox" name="grid-rows" id="" />
      <h3>Grid Rows</h3>
    </div>

    <number-input label="Gutter" v-model="gutter" freeze="points" />
    <number-input label="Rows" v-model="rows" freeze="rows" />
  </panel>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NumberInput from "./NumberInput.vue";
import Panel from "./Panel.vue";

export default defineComponent({
  name: "PanelGridRows",
  components: { NumberInput, Panel },
  setup() {
    const gutter = ref(12);
    const rows = 12;
    return { gutter, rows };
  }
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
