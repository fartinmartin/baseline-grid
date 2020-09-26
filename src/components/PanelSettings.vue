<template>
  <panel>
    <h2>Document Settings</h2>

    <div>
      <select-input
        id="page-units"
        label="Units: "
        v-model="unit"
        :options="unitPresets"
      />
    </div>
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import unitPresets from "@/assets/data/unit-presets.json";
import Panel from "./Panel.vue";
import SelectInput from "./SelectInput.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelSettings",
  components: { Panel, SelectInput },
  setup() {
    const { unit } = useToolbar();

    return {
      unit,
      unitPresets
    };
  }
});
</script>
