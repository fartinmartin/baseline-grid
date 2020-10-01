<template>
  <span class="value" @mouseover="mouseOver" @mouseleave="mouseLeave">
    {{ plus }}{{ cache.value }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useToolbar from "@/composables/useToolbar";

type Property = "top" | "bottom" | "leading" | "gutter" | "rows";

export default defineComponent({
  name: "ValuePreview",
  props: {
    property: {
      type: String as () => Property,
      required: true
    },
    value: {
      type: Number, // in points
      required: true
    }
  },
  setup(props) {
    const plus = computed(() => (Math.sign(props.value) === 1 ? `+` : null));
    const { top, bottom, leading, gutter, rows, factor } = useToolbar();
    const cache = {
      value: props.value,
      mt: top.value,
      mb: bottom.value,
      leading: leading.value,
      gutter: gutter.value,
      rows: rows.value
    };

    const mouseOver = () => {
      // could this be animated?
      switch (props.property) {
        case "top":
          top.value = top.value + props.value * factor.value;
          break;
        case "bottom":
          bottom.value = bottom.value + props.value * factor.value;
          break;
        case "leading":
          leading.value = props.value;
          break;
        case "gutter":
          gutter.value = props.value;
          break;
        case "rows":
          rows.value = props.value;
          break;
        default:
          break;
      }
    };

    const mouseLeave = () => {
      // could this be animated?
      switch (props.property) {
        case "top":
          top.value = cache.mt;
          break;
        case "bottom":
          bottom.value = cache.mb;
          break;
        case "leading":
          leading.value = cache.leading;
          break;
        case "gutter":
          gutter.value = cache.gutter;
          break;
        case "rows":
          rows.value = cache.rows;
          break;
        default:
          break;
      }
    };

    return { mouseOver, mouseLeave, plus, cache };
  }
});
</script>

<style lang="scss" scoped>
.value {
  display: inline-block;
  background: var(--white);
  font-family: monospace;
  padding: 0 0.5em;
  border-radius: var(--border-radius);
}
</style>
