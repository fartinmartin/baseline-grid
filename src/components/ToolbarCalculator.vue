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
      <select-input label="Presets" v-model:selected="preset" :options="pp" />

      <number-input label="Width" v-model="width" optional />
      <number-input label="Height" v-model="height" />

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

    <panel header="Grid Rows" v-model="checkMyGridRows" optional>
      <number-input
        label="Gutter"
        v-model="gutter"
        freeze="points"
        :min="leading"
        :step="leading"
        :disabled="!checkMyGridRows"
      />
      <number-input
        label="Rows"
        v-model="rows"
        freeze="rows"
        :disabled="!checkMyGridRows"
      />
    </panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./Panel.vue";
import RadioInput from "./RadioInput.vue";
import SelectInput from "./SelectInput.vue";
import NumberInput from "./NumberInput.vue";
import pp from "@/assets/data/page-presets.json";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "ToolbarCalculator",
  components: {
    Panel,
    NumberInput,
    SelectInput,
    RadioInput
  },
  setup() {
    const {
      leading,
      width,
      height,
      orientation,
      unit,
      preset,
      top,
      bottom,
      gutter,
      rows,
      checkMyGridRows
    } = useToolbar();

    const setOrientation = (event: { target: HTMLInputElement }) => {
      const target = event.target.value;
      if (
        (target === "landscape" && width.value < height.value) ||
        (target === "portrait" && width.value > height.value)
      ) {
        [width.value, height.value] = [height.value, width.value];
        orientation.value = target;
      }
    };

    return {
      leading,
      pp,
      width,
      height,
      orientation,
      unit,
      preset,
      setOrientation,
      top,
      bottom,
      gutter,
      rows,
      checkMyGridRows
    };
  }
});
</script>
