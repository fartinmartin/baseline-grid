<template>
  <panel>
    <h2>Page Size</h2>

    <select-input
      id="page-units"
      label="Units: "
      v-model="unit"
      :data="unitPresets"
    />

    <select-input
      id="page-presets"
      label="Presets: "
      v-model="preset"
      :data="pagePresets"
    />

    <number-input
      label="Width: "
      :value="width"
      @change="e => (width = e.target.value)"
      :unit="unit"
    />

    <number-input
      label="Height: "
      :value="height"
      @change="e => (height = e.target.value)"
      :unit="unit"
    />

    <div>
      <h3>Orientation</h3>
      <div>
        <input id="portrait" value="portrait" type="radio" />
        <label for="portrait">Portrait</label>
      </div>
      <div>
        <input id="landscape" value="landscape" type="radio" />
        <label for="landscape">Landscape</label>
      </div>
    </div>
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UnitOption, PageOption, Orientation } from "@/types";
import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import Panel from "./Panel.vue";
import SelectInput from "./SelectInput.vue";
import NumberInput from "./NumberInput.vue";

export default defineComponent({
  name: "PageSize",
  components: { Panel, SelectInput, NumberInput },
  data: () => ({
    width: 51,
    height: 66,
    orientation: "portrait" as Orientation,
    unit: "picas" as UnitOption,
    preset: "letter" as PageOption,
    pagePresets,
    unitPresets
  })
});
</script>
