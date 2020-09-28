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

    <panel header="Grid Rows" optional>
      <number-input label="Gutter" v-model="gutter" freeze="points" />
      <number-input label="Rows" v-model="rows" freeze="rows" />
    </panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
      bottom
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

    const gutter = ref(12);
    const rows = ref(7);

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
      rows
    };
  }
});
</script>
