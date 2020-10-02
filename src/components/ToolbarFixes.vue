<template>
  <div class="fixes-wrap">
    <div class="intro">
      <p>
        Here are a couple things you may want to try...
      </p>
      <p class="note">
        Keep in mind I am a robot—use your human judgement to choose the best
        option!
      </p>
    </div>
    <panel header="Baseline Grid" :disabled="!isPassing">
      <div v-if="!baseline">
        <div class="option">
          <h4 class="label">Keep your leading and...</h4>
          <p>
            Adjust your <span class="property">margins</span> by a total of
            <value-preview property="bottom" :value="marginRemainder" />
            or
            <value-preview
              property="bottom"
              :value="newMarginHeight.high - safe"
            />
            or
            <value-preview
              property="bottom"
              :value="newMarginHeight.low - safe"
            />
            points.
          </p>
        </div>
        <div class="option-divider">
          <span>or</span>
          <div class="rule" />
        </div>
        <div class="option">
          <h4 class="label">
            Keep your margins and...
          </h4>
          <p>
            Adjust your <span class="property">leading</span> to
            <value-preview property="leading" :value="newLeading.high" />
            or
            <value-preview property="leading" :value="newLeading.low" /> points.
          </p>
        </div>
      </div>
      <div v-else>
        <p>
          <span class="check">
            <img src="@/assets/images/check.svg" alt="" />
          </span>
          You're all set here!
        </p>
      </div>
    </panel>
    <panel header="Grid Rows" :disabled="!checkGrid">
      <div v-if="checkGrid">
        <div v-if="!grid">
          <div class="option">
            <h4 class="label">Keep your grid and...</h4>
            <p>
              Adjust your <span class="property">margins</span> by a total of
              <value-preview property="bottom" :value="newSafe.high - safe" />
              or
              <value-preview property="bottom" :value="newSafe.low - safe" />
              points.
            </p>
          </div>
          <div class="option-divider">
            <span>or</span>
            <div class="rule" />
          </div>
          <div class="option">
            <h4 class="label">
              Keep your margins and...
            </h4>
            <p>
              Adjust your <span class="property">gutter</span> to
              <span class="value">TBD</span> or
              <span class="value">TBD</span> points and your
              <span class="property">row count</span> to
              <span class="value">TBD</span> or <span class="value">TBD</span>.
            </p>
          </div>
        </div>
        <div v-else>
          <p>
            <span class="check">
              <img src="@/assets/images/check.svg" alt="" />
            </span>
            You're all set here!
          </p>
        </div>
      </div>
      <div v-else>
        <p>
          You haven't enabled the
          <span class="property">Grid Rows</span> option!
        </p>
      </div>
    </panel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import Panel from "./Panel.vue";
import ValuePreview from "./ValuePreview.vue";
import useToolbar from "@/composables/useToolbar";
import { factors, closest, multiples } from "@/utils";

// TODOs:
// 1. figure out how to suggest gutter and row options
// 2. implement array based options (see comment block below)
// 3. update grid styles
// 4. adapt unit to current selected unit
// 5. animate page preview changes?

export default defineComponent({
  name: "ToolbarFixes",
  components: { Panel, ValuePreview },
  setup() {
    const {
      global,
      dimensions,
      margins,
      grid,
      preview,
      isPassing
    } = useToolbar();

    const { checkGrid } = toRefs(global);
    const { safe } = toRefs(margins);

    // there should be an array of numbers for each option
    // then you could loop over them in the template
    // there should also be a validate (function?) that checks
    // if the MARGIN value that is about to be pushed creates a
    // scenario that exceeds the page dimensions
    const baselineOptions: { margins: number[]; leading: number[] } = {
      margins: [],
      leading: []
    };

    const m = Object.values(
      closest(multiples(global.leading, dimensions.heightPt), margins.safe)
    );
    const l = Object.values(closest(factors(margins.safe), global.leading));

    baselineOptions.margins = [...baselineOptions.margins, ...m];
    baselineOptions.leading = [...baselineOptions.leading, ...l];

    // console.log(baselineOptions);

    const gridOptions: { margins: number[]; grid: object[] } = {
      margins: [],
      grid: []
    };

    baselineOptions.margins.push(1);
    gridOptions.grid.push({ gutter: 12, row: 6 });

    const newLeading = closest(factors(margins.safe), global.leading);
    const newMarginHeight = closest(
      multiples(global.leading, dimensions.heightPt),
      margins.safe
    );

    const marginRemainder = computed(
      () => margins.safe - global.leading * Math.ceil(margins.lines)
    );

    const newRowSize = closest(
      multiples(global.leading, dimensions.heightPt),
      grid.rowSize
    );

    const newSafe = {
      high: grid.rows * newRowSize.high + (grid.rows - 1) * grid.gutter,
      low: grid.rows * newRowSize.low + (grid.rows - 1) * grid.gutter
    };

    // const newGutterCount = 36;
    // const newRowCount = 3;

    return {
      isPassing,
      checkGrid,
      newLeading,
      newMarginHeight,
      newRowSize,
      ...toRefs(isPassing),
      newSafe,
      safe,
      marginRemainder,
      preview
    };
  }
});
</script>

<style lang="scss" scoped>
.intro {
  padding: 2rem;
}

.option:not(:first-of-type) {
  margin-top: 1rem;
}

.property {
  font-weight: 700;
}

.value {
  display: inline-block;
  background: var(--white);
  font-family: monospace;
  padding: 0 0.5em;
  border-radius: var(--border-radius);
}

p + p {
  margin-top: 1rem;
}

.note {
  font-size: 0.875rem;
  color: var(--gray-40);
}

.option-divider {
  margin-top: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    /* text-transform: uppercase; */
    font-style: italic;
    background: var(--gray-00);
    color: var(--gray-30);
    padding: 0 0.5rem;
    position: relative;
    z-index: 100;
  }

  .rule {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    border-top: 1px dotted var(--gray-30);
  }
}

.check {
  display: inline-block;
  padding: 0.125rem;

  border-radius: 50%;
  background: var(--green-light);
  border: 2px solid var(--green-base);

  position: relative;
  top: 5px;
  margin-right: 0.25rem;

  img {
    max-width: 100%;
    width: 0.875rem;
    height: 0.875rem;
  }
}
</style>
