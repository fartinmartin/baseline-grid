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
import { defineComponent, toRefs } from "vue";
import Panel from "./Panel.vue";
import ValuePreview from "./ValuePreview.vue";
import useToolbar from "@/composables/useToolbar";
import { factors, closest, multiples, closestToZero } from "@/utils";

// TODOs:
// 1. figure out how to suggest gutter and row options
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
      // preview,
      isPassing
    } = useToolbar();

    const { checkGrid } = toRefs(global);
    const {
      baseline: baselinePassing,
      grid: gridPassing,
      all: allPassing
    } = toRefs(isPassing);

    // 1. collect all the numbers
    // 2. filter out impossible numbers OR duplicates
    // 3. sort the numbers by smallest distance to 0 (aka: not by "value", -100 shouldn't trump +1)

    const baselineOptions: { margins: number[]; leading: number[] } = {
      margins: [
        // the two multiples of the leading that are closest to margin safe area
        ...Object.values(
          closest(multiples(global.leading, dimensions.heightPt), margins.safe)
        ).map(i => i - margins.safe)
      ].sort(closestToZero),
      leading: [
        // the two factors of margin safe area that are closest to the leading
        ...Object.values(closest(factors(margins.safe), global.leading))
      ].sort(closestToZero)
    };

    const gridOptions: {
      margins: number[];
      grid: { gutter: number; rows: number }[];
    } = {
      margins: [
        grid.rows *
          closest(multiples(global.leading, dimensions.heightPt), grid.rowSize)
            .high +
          (grid.rows - 1) * grid.gutter -
          margins.safe,
        grid.rows *
          closest(multiples(global.leading, dimensions.heightPt), grid.rowSize)
            .low +
          (grid.rows - 1) * grid.gutter -
          margins.safe
      ].sort(closestToZero),
      grid: []
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
</style>
