<template>
  <div class="page-wrap">
    <div id="page" :style="pageDimensions">
      <div id="margin">
        <div id="baseline-grid">
          <img src="@/assets/images/id.png" style="width: 500px" />
          {{ (width, height) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PagePreview",
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageDimensions(): string {
      return `width: ${this.width}px; height: ${this.height}px;`;
    }
  }
});
</script>

<style lang="scss" scoped>
.page-wrap {
  display: grid;
  place-items: center;

  width: 100%;
  height: 100vh;

  background: var(--gray-05);
}

#page {
  background: var(--white);
}

#margin {
  border: 1px solid magenta;
}
</style>
