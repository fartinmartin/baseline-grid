<template>
  <li
    class="value-group"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    :class="{ active }"
  >
    <div v-for="(item, index) in group" :key="item.property">
      <template v-if="item.actual !== item.value">
        <span class="property">{{ item.label }}</span> to
        <value-preview
          :property="item.property"
          :value="item.value"
          :trigger="active"
          absolute
        />
        {{ " " }}<span>{{ item.unit }}</span>
        <span
          v-if="
            index < group.length - 1 &&
              group[index + 1].actual !== group[index + 1].value
          "
        >
          and
        </span>
        <br v-if="index < group.length - 1" />
      </template>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PropertyOption } from "@/types";
import ValuePreview from "./ValuePreview.vue";

export default defineComponent({
  name: "ValueGroupPreview",
  props: {
    group: {
      type: Array as () => {
        property: PropertyOption;
        value: number;
      }[],
      required: true
    }
  },
  components: { ValuePreview },
  setup() {
    const active = ref(false);

    const mouseOver = () => (active.value = true);
    const mouseLeave = () => (active.value = false);

    return { active, mouseOver, mouseLeave };
  }
});
</script>

<style lang="scss" scoped>
.property {
  font-weight: 700;
}

.value-group.active {
  color: var(--blue-base);
}
</style>
