<template>
  <div class="page-wrap">
    <div id="page" :style="pageStyle">
      <div id="margin" :style="marginStyle">
        <div id="baseline-grid">
          <div
            v-for="(line, index) in linesRoundedUp"
            :key="index"
            class="line"
            :style="lineStyle"
          />
        </div>
        <div id="grid-bottom-lines" v-if="checkGrid">
          <div
            v-for="(row, index) in rows"
            :key="index"
            class="guide"
            :style="guideStyle"
          />
        </div>
        <div id="grid-top-lines" :style="gridTopLinesStyle" v-if="checkGrid">
          <div
            v-for="(row, index) in rows"
            :key="index"
            class="guide"
            :style="guideStyle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO:
// Allow users to click and drag to scroll when there is overflow.
// See: https://htmldom.dev/drag-to-scroll/

import { computed, defineComponent } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PagePreview",
  setup() {
    const {
      widthPt,
      heightPt,
      topPt,
      botPt,
      lines,
      leading,
      rowSize,
      gutter,
      rows,
      checkGrid
    } = useToolbar();

    const pageStyle = computed(
      () => `width: ${widthPt.value}px; height: ${heightPt.value}px;`
    );

    const marginStyle = computed(
      () => `top: ${topPt.value}px; bottom: ${botPt.value}px`
    );

    const lineStyle = computed(() => `margin-top: ${leading.value - 1}px`);
    const linesRoundedUp = computed(() => Math.ceil(lines.value));

    const guideStyle = computed(
      () => `height: ${rowSize.value}px; margin-top: ${gutter.value}px`
    );
    const gridTopLinesStyle = computed(
      () => `margin-top: ${gutter.value - 1}px`
    );

    return {
      pageStyle,
      marginStyle,
      lineStyle,
      guideStyle,
      linesRoundedUp,
      leading,
      lines,
      rows,
      gridTopLinesStyle,
      checkGrid
    };
  }
});
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: auto;

  background: var(--gray-50);
}

#page {
  background: var(--white);
  position: relative;
  box-sizing: content-box;
  border: 1px solid var(--black);
  box-shadow: 2px 2px 0px 0px var(--black);
  margin: 5.5rem;

  // to force a right & bottom margin of 5.5rem
  &::before {
    content: "";
    position: relative;
    display: block;
    top: 0;
    left: 100%;
    width: 5.5rem;
    height: 100%;
    /* background: red; */
  }

  &::after {
    content: "";
    position: relative;
    display: block;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.5rem;
    /* background: green; */
  }
}

#margin {
  border: 1px solid magenta;
  position: absolute;
  left: 5.8823529%;
  right: 5.8823529%;
  overflow: hidden;
}

#baseline-grid,
#grid-top-lines,
#grid-bottom-lines {
  margin-top: -1px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line {
  width: 100%;
  border-bottom: 1px solid blue;
}

.guide {
  width: 100%;
  border-bottom: 1px solid red;
  z-index: 100;

  &:first-of-type {
    margin-top: 0 !important;
  }
}
</style>
