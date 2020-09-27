<template>
  <panel>
    <div v-if="Number.isInteger(lines)" class="message good-news">
      You're good to go!
    </div>
    <button
      v-else
      class="message bad-news"
      @click.prevent="currentPanel = 'ToolbarFixes'"
    >
      You'll need to make some tweaks. <span>Follow me! →</span>
    </button>
  </panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./Panel.vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelOutput",
  components: { Panel },
  setup() {
    const {
      lines,
      heightPt,
      area,
      topPt,
      bottomPt,
      currentPanel
    } = useToolbar();
    return { lines, heightPt, area, topPt, bottomPt, currentPanel };
  }
});
</script>

<style lang="scss" scoped>
.message {
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--bg-color);
  text-align: center;

  span {
    font-style: italic;
  }
}

.message.good-news {
  --bg-color: hsl(120, 53%, 85%);
  --border-color: hsl(120, 53%, 45%);
}

.message.bad-news {
  --bg-color: hsl(9, 100%, 86%);
  --border-color: hsl(9, 100%, 64%);
}

button.message {
  height: auto;
}
</style>
