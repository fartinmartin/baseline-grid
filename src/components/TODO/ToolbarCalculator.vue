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

      <number-input label="Width" v-model="width" />
      <number-input label="Height" v-model="height" />

      <div class="input-group orientation">
        <label>Orientation:</label>
        <div class="orientation-choices">
          <div class="radio-group">
            <input
              id="portrait"
              value="portrait"
              type="radio"
              name="orientation"
              v-model="orientation"
              @click="setOrientation"
            />
            <label for="portrait" class="serif">Portrait</label>
          </div>
          <div class="radio-group">
            <input
              id="landscape"
              value="landscape"
              type="radio"
              name="orientation"
              v-model="orientation"
              @click="setOrientation"
            />
            <label for="landscape" class="serif">Landscape</label>
          </div>
        </div>
      </div>
    </panel>

    <panel header="Margins">
      <number-input label="Top" v-model="top" />
      <number-input label="Bottom" v-model="bottom" />
    </panel>

    <panel header="Grid Rows">
      <number-input label="Gutter" v-model="gutter" freeze="points" />
      <number-input label="Rows" v-model="rows" freeze="rows" />
    </panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NumberInput from "./SelectInput.vue";
import SelectInput from "./NumberInput.vue";
import pp from "@/assets/data/page-presets.json";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "Toolbar",
  components: {
    NumberInput,
    SelectInput
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
      const target = event.target.id;
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
