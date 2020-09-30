<template>
  <div class="fixes-wrap">
    <div v-if="!isPassing">
      <div class="intro">
        <p>
          Here are a couple things you may want to try...
        </p>
        <p class="note">
          <span>Note: </span>
          Keep in mind I am a robot—use your human judgement to choose the best
          option!
        </p>
      </div>
      <panel header="Baseline Grid" :disabled="!isPassing">
        <div v-if="!baselineIsPassing">
          <div class="option">
            <h4 class="label">You could...</h4>
            <p>
              Adjust your <span class="property">margins</span> by a total of
              <span class="value">+{{ newMarginHeight.high - area }}</span> or
              <span class="value">{{ newMarginHeight.low - area }}</span>
              points.
            </p>
            <p class="note">
              <span>Note: </span>This could mean adjusting either your top or
              bottom margin by either value OR dividing that value amongst the
              top and bottom margins.
            </p>
          </div>
          <div class="option">
            <h4 class="label">
              Another option is to...
            </h4>
            <p>
              Adjust your <span class="property">leading</span> to
              <span class="value">{{ newLeading.high }}</span> or
              <span class="value">{{ newLeading.low }}</span> points.
            </p>
            <p class="note">
              <span>Note: </span>This is the less likely option as you may have
              already settled on a size and leading for your body copy.
            </p>
          </div>
        </div>
        <div v-else>
          <p>You're all set here!</p>
        </div>
      </panel>
      <panel header="Grid Rows" :disabled="!checkMyGridRows">
        <div v-if="checkMyGridRows">
          <div v-if="!gridIsPassing">
            <div class="option">
              <h4 class="label">You could...</h4>
              <p>
                Adjust your <span class="property">margins</span> by a total of
                <span class="value">+{{ newArea.high - area }}</span> or
                <span class="value">{{ newArea.low - area }}</span>
                points.
              </p>
              <p class="note">
                <span>Note: </span>This could mean adjusting either your top or
                bottom margin by either value OR dividing that value amongst the
                top and bottom margins.
              </p>
            </div>
            <div class="option">
              <h4 class="label">
                Another option is to...
              </h4>
              <p>
                Adjust your <span class="property">gutter</span> to
                <span class="value">TBD</span> or
                <span class="value">TBD</span> points and your
                <span class="property">row count</span> to
                <span class="value">TBD</span> or
                <span class="value">TBD</span>.
              </p>
              <p class="note">
                <span>Note: </span>This clearly doesn't work yet and will take a
                big brain to figure it out.
              </p>
            </div>
          </div>
          <div v-else>
            <p>You're all set here!</p>
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
    <div v-else>
      <div class="intro">
        You got your shit together!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./Panel.vue";
import useToolbar from "@/composables/useToolbar";
import { factors, closest, multiples } from "@/utils";

export default defineComponent({
  name: "ToolbarFixes",
  components: { Panel },
  setup() {
    const {
      currentPanel,
      isPassing,
      checkMyGridRows,
      heightPt,
      leading,
      baselineIsPassing,
      gridIsPassing,
      rowSize,
      gutter,
      rows,
      area
    } = useToolbar();

    const newLeading = closest(factors(area.value), leading.value);
    const newMarginHeight = closest(
      multiples(leading.value, heightPt.value),
      area.value
    );

    const newRowSize = closest(
      multiples(leading.value, heightPt.value),
      rowSize.value
    );

    const newArea = {
      high: rows.value * newRowSize.high + (rows.value - 1) * gutter.value,
      low: rows.value * newRowSize.low + (rows.value - 1) * gutter.value
    };

    const newGutterCount = 36;
    const newRowCount = 3;

    return {
      currentPanel,
      isPassing,
      checkMyGridRows,
      newLeading,
      newMarginHeight,
      newRowSize,
      baselineIsPassing,
      gridIsPassing,
      newArea,
      area
    };
  }
});
</script>

<style lang="scss" scoped>
.intro {
  padding: 2rem;
}

.option:not(:first-of-type) {
  margin-top: 2rem;
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

  span {
    font-style: italic;
  }
}
</style>
