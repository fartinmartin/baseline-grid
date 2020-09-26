<template>
  <div class="page-wrap">
    <div id="page" :style="`width: ${widthPt}px; height: ${heightPt}px;`">
      <div id="margin" :style="`top: ${topPt}px; bottom: ${bottomPt}px`">
        <div id="baseline-grid">
          <div
            v-for="(line, index) in lines"
            :key="index"
            class="line"
            :style="`margin-top: ${leading}px;`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PagePreview",
  setup() {
    const { widthPt, heightPt, topPt, bottomPt, lines, leading } = useToolbar();

    // why are these refs only reactive in the template?

    // const pageStyle = `width: ${widthPt.value}px; height: ${heightPt.value}px;`;
    // const marginStyle = `top: ${topPt.value}px; bottom: ${bottomPt.value}px`;
    // const lineStyle = `margin-top: ${leading.value}px`;

    return {
      widthPt,
      heightPt,
      topPt,
      bottomPt,
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
  /* overflow: hidden; */
}

.line {
  width: 100%;
  /* transform: translateY(-1px); */
  border-bottom: 1px solid blue;
}
</style>
