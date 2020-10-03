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
    <panel header="Baseline Grid" :disabled="!allPassing">
      <div v-if="!baselinePassing">
        <div class="option">
          <h4 class="label">Keep your leading and...</h4>
          <p>
            Adjust your <span class="property">margin safe area</span> by a
            total of
            <template
              v-for="(option, index) in baselineOptions.margins"
              :key="option"
            >
              <value-preview property="bottom" :value="option" />
              <span v-if="index < baselineOptions.margins.length - 1">
                or
              </span>
            </template>
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
            <template
              v-for="(option, index) in baselineOptions.leading"
              :key="option"
            >
              <value-preview property="leading" :value="option" />
              <span v-if="index < baselineOptions.leading.length - 1">
                or
              </span>
            </template>
            points.
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
        <div v-if="!baselinePassing">
          <p>
            You need to fix your
            <span class="property">Basline Grid</span> before tweaking the
            <span class="property">Grid Rows</span>!
          </p>
        </div>
        <div v-else-if="baselinePassing && !gridPassing">
          <div class="option">
            <h4 class="label">Keep your grid and...</h4>
            <p>
              Adjust your <span class="property">margin safe area</span> by a
              total of
              <template
                v-for="(option, index) in gridOptions.margins"
                :key="option"
              >
                <value-preview property="bottom" :value="option" />
                <span v-if="index < gridOptions.margins.length - 1"> or </span>
              </template>
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
            <div>
              Adjust your...
              <ul class="option-list">
                <template
                  v-for="(combo, index) in gridOptions.grid"
                  :key="combo"
                >
                  <value-group-preview :group="combo" />
                  <div
                    class="option-divider"
                    v-if="index < gridOptions.grid.length - 1"
                  >
                    <span>or</span>
                    <div class="rule" />
                  </div>
                </template>
              </ul>
            </div>
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
import { defineComponent, toRefs } from "vue";
import Panel from "./Panel.vue";
import ValuePreview from "./ValuePreview.vue";
import ValueGroupPreview from "./ValueGroupPreview.vue";
import useToolbar from "@/composables/useToolbar";
import { factors, closest, multiples, closestToZero } from "@/utils";

// TODOs:
// 1. figure out how to suggest gutter and row options
// 4. adapt unit to current selected unit
// 5. animate page preview changes?

export default defineComponent({
  name: "ToolbarFixes",
  components: { Panel, ValuePreview, ValueGroupPreview },
  setup() {
    const { global, dimensions, margins, grid, isPassing } = useToolbar();

    const { checkGrid } = toRefs(global);
    const {
      baseline: baselinePassing,
      grid: gridPassing,
      all: allPassing
    } = toRefs(isPassing);

    const leadingMultiples = multiples(global.leading, dimensions.heightPt);
    const marginMatch = closest(leadingMultiples, margins.safe);
    const rowSizeMatch = closest(leadingMultiples, grid.rowSize);

    // 1. define three arrays for all possible values of: rowCount, rowSize, gutter
    const possible = [
      [...Array(Math.ceil(margins.lines / 2)).keys()].slice(2), // rowCount
      multiples(global.leading, margins.safe / 2), // rowSize
      multiples(global.leading, margins.safe / 2) // gutterSize
    ];

    // 2. find all combos of those three arrays
    // don't fully understand this (classic) but it returns an array of combos—just what i need
    // https://stackoverflow.com/a/44338759/8703073
    function* cartesian(
      head?: number[],
      ...tail: number[][]
    ): object | number[][] {
      const remainder: object | number[][] = tail.length
        ? cartesian(...tail)
        : [[]];
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      for (const r of remainder) for (const h of head) yield [h, ...r];
    }

    // 3. filter combos to only those that when test()'d fall within margins.safe
    const test = (rowCount: number, rowSize: number, gutter: number) =>
      rowCount * rowSize + (rowCount - 1) * gutter;

    const combos = [...cartesian(...possible)]
      .filter(combo => test(combo[0], combo[1], combo[2]) === margins.safe)
      .filter(
        combo => combo[2] <= combo[1] // removes combos where gutter is larger than rowsize
      );

    const baselineOptions: { margins: number[]; leading: number[] } = {
      margins: [
        // the two multiples of the leading that are closest to margin safe area
        ...Object.values(marginMatch).map(i => i - margins.safe)
      ].sort(closestToZero),
      leading: [
        // the two factors of margin safe area that are closest to the leading
        ...Object.values(closest(factors(margins.safe), global.leading))
      ].sort(closestToZero)
    };

    const gridOptions: {
      margins: number[];
      grid: object[];
    } = {
      margins: [
        // the two multiples of the rowSize that are closest to margin safe area
        ...Object.values(rowSizeMatch).map(
          i => grid.rows * i + (grid.rows - 1) * grid.gutter - margins.safe
        )
      ].sort(closestToZero),
      grid: [
        ...combos.map(combo => [
          {
            property: "gutter",
            value: combo[2],
            unit: "points"
          },
          {
            property: "rows",
            value: combo[0],
            unit: "rows"
          }
        ])
      ].sort(
        (a, b) => grid.rows - a[1].value - Math.abs(grid.rows - b[1].value)
      )
    };

    return {
      baselinePassing,
      gridPassing,
      allPassing,
      checkGrid,
      baselineOptions,
      gridOptions
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

.option-list {
  li {
    margin-top: 1rem;
  }

  .option-divider .rule {
    width: calc(100% - 4rem);
  }
}
</style>
