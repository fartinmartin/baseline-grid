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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PagePreview",
  setup() {
    const { widthPt, heightPt, topPt, bottomPt, lines, leading } = useToolbar();

    const pageStyle = computed(
      () => `width: ${widthPt.value}px; height: ${heightPt.value}px;`
    );

    const marginStyle = computed(
      () => `top: ${topPt.value}px; bottom: ${bottomPt.value}px`
    );

    const lineStyle = computed(() => `margin-top: ${leading.value - 1}px`);

    const linesRoundedUp = computed(() => Math.ceil(lines.value));

    return {
      pageStyle,
      marginStyle,
      lineStyle,
      linesRoundedUp,
      leading,
      lines
    };
  }
});
</script>

<style lang="scss" scoped>
.page-wrap {
  display: grid;
  place-items: center;

  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  background: var(--gray-05);
}

#page {
  background: var(--white);
  position: relative;
}

#margin {
  border: 1px solid magenta;
  position: absolute;
  left: 5.8823529%;
  right: 5.8823529%;
  overflow: hidden;
}

#baseline-grid {
  margin-top: -1px;
}

.line {
  width: 100%;
  /* transform: translateY(-1px); */
  border-bottom: 1px solid blue;
}
</style>
