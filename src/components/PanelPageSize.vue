<template>
  <panel>
    <h3>Page Size</h3>

    <select-input label="Presets" v-model:selected="preset" :options="pages" />

    <div>
      <number-input label="Width" v-model="width" />
      <number-input label="Height" v-model="height" />
    </div>

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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pages from "@/assets/data/page-presets.json";
import Panel from "./Panel.vue";
import SelectInput from "./SelectInput.vue";
import NumberInput from "./NumberInput.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelPageSize",
  components: { Panel, SelectInput, NumberInput },
  setup() {
    const { width, height, orientation, unit, preset } = useToolbar();

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

    return {
      width,
      height,
      orientation,
      setOrientation,
      unit,
      preset,
      pages
    };
  }
});
</script>

<style lang="scss" scoped>
.orientation-choices,
.radio-group {
  display: flex;
  align-items: center;
}

.radio-group:not(:first-child) {
  margin-left: 1rem;
}
.radio-group input {
  margin-right: 0.5rem;
}
</style>
