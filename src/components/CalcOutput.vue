<template>
  <button
    v-if="panel != 'ToolbarFixes'"
    class="message"
    :class="allPassing ? 'good-news' : 'bad-news'"
    @click.prevent="onClick"
    tabindex="-1"
  >
    <span v-if="allPassing">
      Things are lining up—<br />you're good to go!
    </span>
    <span v-else>
      Things aren't quite tracking.<br />
      <span class="cta">Let's make some tweaks! →</span>
    </span>
  </button>

  <button
    v-else
    class="message okay-news"
    @click.prevent="panel = 'ToolbarCalculator'"
    tabindex="-1"
  >
    Okay, got it.<br />
    <span class="cta">← Take me back!</span>
  </button>
</template>

<script lang="ts">
// 🚨 TODO:
// This could/should <transition>ed (fade?) to feel like it fits with toolbar panel transitions

import { defineComponent, toRefs } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "CalcOutput",
  setup() {
    const { margins, current, isPassing } = useToolbar();
    const { lines } = toRefs(margins);
    const { panel } = toRefs(current);
    const { all: allPassing } = toRefs(isPassing);

    const onClick = () => {
      if (allPassing) return;
      panel.value = "ToolbarFixes";
    };

    return { lines, panel, onClick, allPassing };
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
  --bg-color: var(--green-light);
  --border-color: var(--green-base);
  pointer-events: none;
}

.message.bad-news {
  --bg-color: var(--red-light);
  --border-color: var(--red-base);
}

.message.okay-news {
  --bg-color: var(--yellow-light);
  --border-color: var(--yellow-base);
}

button.message {
  height: auto;
}
</style>
