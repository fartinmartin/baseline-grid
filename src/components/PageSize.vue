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

      <select-input
        id="page-presets"
        label="Presets: "
        v-model="preset"
        :options="pagePresets"
      />
    </div>

    <div>
      <h3>Page Size</h3>

      <number-input label="Width: " v-model="width" :unit="unit" />
      <number-input label="Height: " v-model="height" :unit="unit" />
    </div>

    <div>
      <h3>Orientation</h3>

      <div>
        <input id="portrait" value="portrait" type="radio" name="orientation" />
        <label for="portrait">Portrait</label>
      </div>
      <div>
        <input
          id="landscape"
          value="landscape"
          type="radio"
          name="orientation"
        />
        <label for="landscape">Landscape</label>
      </div>
    </div>
  </panel>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import Panel from "./Panel.vue";
import SelectInput from "./SelectInput.vue";
import NumberInput from "./NumberInput.vue";
import useToolbar from "@/state/toolbar";

export default defineComponent({
  name: "PageSize",
  components: { Panel, SelectInput, NumberInput },
  setup() {
    const { width, height, orientation, unit, preset } = useToolbar();
    const {
      updateWidth,
      updateHeight,
      updateOrientation,
      updatePreset,
      updateUnit
    } = useToolbar();

    watch(width, width => updateWidth(width));
    watch(height, height => updateHeight(height));
    watch(orientation, orientation => updateOrientation(orientation));
    watch(unit, unit => updateUnit(unit));
    watch(preset, preset => updatePreset(preset));

    return {
      width,
      height,
      orientation,
      unit,
      preset,
      pagePresets,
      unitPresets
    };
  }
});
</script>
