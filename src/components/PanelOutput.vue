<template>
  <button
    v-if="currentPanel != 'ToolbarFixes'"
    class="message"
    :class="Number.isInteger(lines) ? 'good-news' : 'bad-news'"
    @click.prevent="onClick"
  >
    <span v-if="Number.isInteger(lines)">
      Things are lining up—<br />you're good to go!
    </span>
    <span v-else>
      You'll need to make some tweaks.
      <span class="cta">Follow me! →</span>
    </span>
  </button>

  <button
    v-else
    class="message okay-news"
    @click.prevent="currentPanel = 'ToolbarCalc'"
  >
    Okay, got it.<br />
    <span class="cta">← Take me back!</span>
  </button>
</template>

<script lang="ts">
// 🚨 TODO:
// This could/should <transition>ed (fade?) to feel like it fits with toolbar panel transitions

import { defineComponent } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "PanelOutput",
  setup() {
    const { lines, currentPanel } = useToolbar();

    const onClick = () => {
      if (Number.isInteger(lines)) return;
      currentPanel.value = "ToolbarFixes";
    };
    return { lines, currentPanel, onClick };
  }
});
</script>

<style lang="scss" scoped>
.message {
  /* padding: 1rem 2rem; */
  padding: 2rem;
  border: 2px solid var(--border-color);
  border-right: none;
  border-left: none;
  border-radius: 0;
  background: var(--bg-color);
  text-align: left;
  width: 100%;

  span.cta {
    font-style: italic;
  }
}

.message.good-news {
  --bg-color: hsl(120, 53%, 85%);
  --border-color: hsl(120, 53%, 45%);
  pointer-events: none;
}

.message.bad-news {
  --bg-color: hsl(9, 100%, 86%);
  --border-color: hsl(9, 100%, 64%);
}

.message.okay-news {
  --bg-color: hsl(36, 100%, 86%);
  --border-color: hsl(36, 100%, 64%);
}

button.message {
  height: auto;
}
</style>
