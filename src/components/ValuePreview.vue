<template>
  <span class="value" @mouseover="mouseOver" @mouseleave="mouseLeave">
    {{ plus }}{{ cache.value }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import useToolbar from "@/composables/useToolbar";
import { PropertyOption } from "@/types";

export default defineComponent({
  name: "ValuePreview",
  props: {
    property: {
      type: String as () => PropertyOption,
      required: true
    },
    value: {
      type: Number, // in points
      required: true
    },
    trigger: {
      type: Boolean
    }
  },
  setup(props) {
    const plus = computed(() =>
      Math.sign(props.value) === 1 && props.property !== "leading" ? `+` : null
    );
    const {
      global,
      current,
      dimensions,
      margins,
      grid,
      preview
    } = useToolbar();

    const cache = {
      value: props.value,
      mt: margins.top,
      mb: margins.bottom,
      leading: global.leading,
      gutter: grid.gutter,
      rows: grid.rows,
      rowSize: grid.rowSize
    };

    const reset = () => {
      preview.top = cache.mt;
      preview.bottom = cache.mb;
      preview.leading = cache.leading;
      preview.gutter = cache.gutter;
      preview.rows = cache.rows;
      preview.rowSize = cache.rowSize;
    };

    const mouseOver = (trigger?: boolean) => {
      // could this be animated?
      global.isPreviewing = true;
      !trigger && reset();

      switch (props.property) {
        case "top":
          preview.top = margins.top - props.value * current.factor;
          preview.rowSize =
            (dimensions.heightPt -
              cache.mt -
              preview.bottom -
              grid.gutter * (grid.rows - 1)) /
            grid.rows;
          break;
        case "bottom":
          preview.bottom = margins.bottom - props.value * current.factor;
          preview.rowSize =
            (dimensions.heightPt -
              cache.mt -
              preview.bottom -
              grid.gutter * (grid.rows - 1)) /
            grid.rows;
          break;
        case "leading":
          preview.leading = props.value;
          break;
        case "gutter":
          preview.gutter = props.value;
          preview.rowSize =
            (dimensions.heightPt -
              cache.mt -
              preview.bottom -
              preview.gutter * (preview.rows - 1)) /
            preview.rows;
          break;
        case "rows":
          preview.rows = props.value;
          preview.rowSize =
            (dimensions.heightPt -
              cache.mt -
              preview.bottom -
              preview.gutter * (preview.rows - 1)) /
            preview.rows;
          break;
        default:
          break;
      }
    };

    // TODO:
    // figure out how to size the rowSize acurately when both gutter AND rows are triggered

    const mouseLeave = () => {
      global.isPreviewing = false;
      reset();
    };

    watch(
      () => props.trigger,
      (trigger, prevTrigger) => {
        if (trigger === prevTrigger) return;
        if (trigger) mouseOver(trigger);
        else mouseLeave();
      }
    );

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
  border: 2px solid transparent;
  font-size: 0.875rem;
}

.active .value,
.value:hover {
  color: var(--blue-base);
  border-color: var(--blue-base);
  background: var(--blue-light);
}
</style>
