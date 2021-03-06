<template>
  <div class="page-wrap">
    <div
      id="page"
      :style="isPreviewing ? previewStyle.page : style.page"
      :class="{
        all,
        baseline,
        grid,
        calc: panel === 'ToolbarCalculator',
        fixes: panel !== 'ToolbarCalculator'
      }"
    >
      <div
        id="margin"
        :style="isPreviewing ? previewStyle.margin : style.margin"
      >
        <div id="baseline-grid">
          <div
            v-for="(line, index) in isPreviewing
              ? previewLinesRoundedUp
              : linesRoundedUp"
            :key="index"
            class="line"
            :style="isPreviewing ? previewStyle.line : style.line"
          />
        </div>
        <div id="grid-bottom-lines" v-if="checkGrid">
          <div
            v-for="(row, index) in isPreviewing ? previewRows : rows"
            :key="index"
            class="guide"
            :style="isPreviewing ? previewStyle.guide : style.guide"
          />
        </div>
        <div
          id="grid-top-lines"
          :style="isPreviewing ? previewStyle.grid : style.grid"
          v-if="checkGrid"
        >
          <div
            v-for="(row, index) in isPreviewing ? previewRows : rows"
            :key="index"
            class="guide"
            :style="isPreviewing ? previewStyle.guide : style.guide"
          />
        </div>
      </div>
      <div class="robot-note" v-if="robotNote">
        <div>
          <p>
            <span>Psst!</span>
            All this tool really does is check that:
          </p>
          <ul>
            <li>
              your <span class="property">leading</span> is a factor of your
              <span class="property">margin safe area</span>
            </li>
            <li>
              your <span class="property">horizontal rows</span> are a multiple
              of your <span class="property">leading</span>
            </li>
            <li>
              your <span class="property">gutter</span> is a multiple of your
              <span class="property">leading</span>
            </li>
          </ul>
          <p>That's it!</p>
          <hr />
          <p>
            To the left are potential solutions. Hover over them to preview
            their changes.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO:
// Allow users to click and drag to scroll when there is overflow.
// See: https://htmldom.dev/drag-to-scroll/

import { computed, defineComponent, toRefs } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PagePreview",
  setup() {
    const {
      global,
      current,
      dimensions,
      margins,
      grid,
      preview,
      isPassing
    } = useToolbar();
    const { rows: previewRows } = toRefs(preview);
    const { panel } = toRefs(current);

    const style = computed(() => ({
      page: `width: ${dimensions.widthPt}px; height: ${dimensions.heightPt}px;`,
      margin: `top: ${margins.topPt}px; bottom: ${margins.bottomPt}px`,
      line: `margin-top: ${global.leading - 1}px`,
      guide: `height: ${grid.rowSize}px; margin-top: ${grid.gutter}px`,
      grid: `margin-top: ${grid.gutter - 1}px`
    }));

    // TODO:
    // why arent SOME preview guide: `height: ${preview.rowSize}px` not rendering correctly?

    const previewStyle = computed(() => ({
      page: `width: ${dimensions.widthPt}px; height: ${dimensions.heightPt}px;`,
      margin: `top: ${preview.top}px; bottom: ${preview.bottom}px`,
      line: `margin-top: ${preview.leading - 1}px`,
      guide: `height: ${preview.rowSize}px; margin-top: ${preview.gutter}px;`,
      grid: `margin-top: ${preview.gutter - 1}px`
    }));

    const linesRoundedUp = computed(() => Math.ceil(margins.lines));
    const previewLinesRoundedUp = computed(() =>
      Math.ceil(
        (dimensions.heightPt - preview.top - preview.bottom) / preview.leading
      )
    );

    return {
      ...toRefs(global),
      ...toRefs(grid),
      ...toRefs(isPassing),
      panel,
      style,
      linesRoundedUp,
      previewStyle,
      previewLinesRoundedUp,
      previewRows
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

#page.fixes:not(.baseline) .guide {
  /* border-bottom-color: rgba(255, 255, 255, 0) !important; */
  /* opacity: 0.75; */
  border-bottom-style: dotted !important;
  border-bottom-color: var(--yellow-base) !important;
}

.robot-note {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 98%, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  > div > p > span {
    font-style: italic;
  }

  hr {
    border: none;
    border-top: 1px dotted var(--gray-20);
    margin: 1.5rem 0;
  }

  .property {
    font-weight: 700;
  }
}
</style>
