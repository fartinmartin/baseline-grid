<template>
  <div>
    <panel header="Typography">
      <number-input
        label="Leading"
        v-model="leading"
        :step="0.1"
        freeze="points"
      />
    </panel>

    <panel header="Page Size">
      <select-input
        label="Presets"
        v-model:selected="preset"
        :options="pagePresets"
      />

      <number-input :step="step" label="Width" v-model="width" optional />
      <number-input :step="step" label="Height" v-model="height" />

      <radio-input
        label="Orientation"
        v-model="orientation"
        :options="[
          { label: 'Portrait', value: 'portrait' },
          { label: 'Landscape', value: 'landscape' }
        ]"
        @click="setOrientation"
      />
    </panel>

    <panel header="Margins">
      <number-input label="Top" v-model="top" />
      <number-input label="Bottom" v-model="bottom" />
    </panel>

    <panel header="Grid Rows" v-model="checkGrid" optional>
      <number-input
        label="Gutter"
        v-model="gutter"
        freeze="points"
        :min="leading"
        :step="leading"
        :disabled="!checkGrid"
      />
      <number-input
        label="Rows"
        v-model="rows"
        freeze="rows"
        :min="2"
        :disabled="!checkGrid"
      />
    </panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Panel from "./Panel.vue";
import RadioInput from "./RadioInput.vue";
import SelectInput from "./SelectInput.vue";
import NumberInput from "./NumberInput.vue";
import useToolbar from "@/composables/useToolbar";

import pagePresets from "@/assets/data/page-presets.json";

export default defineComponent({
  name: "ToolbarCalculator",
  components: {
    Panel,
    NumberInput,
    SelectInput,
    RadioInput
  },
  setup() {
    const { global, current, dimensions, margins, grid } = useToolbar();

    const { leading, preset, checkGrid } = toRefs(global);
    const { unit, step } = toRefs(current);
    const { width, height, orientation } = toRefs(dimensions);
    const { top, bottom } = toRefs(margins);
    const { gutter, rows } = toRefs(grid);

    const setOrientation = (event: { target: HTMLInputElement }) => {
      const target = event.target.value;
      if (
        (target === "landscape" && dimensions.width < dimensions.height) ||
        (target === "portrait" && dimensions.width > dimensions.height)
      ) {
        [dimensions.width, dimensions.height] = [
          dimensions.height,
          dimensions.width
        ];
        dimensions.orientation = target;
      }
    };

    return {
      leading,
      checkGrid,
      preset,
      step,
      unit,
      width,
      height,
      orientation,
      top,
      bottom,
      gutter,
      rows,
      setOrientation,
      pagePresets
    };
  }
});
</script>
