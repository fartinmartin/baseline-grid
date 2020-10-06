<template>
  <div class="panel" :class="{ open }">
    <div class="header" @click="handleOpen">
      <div class="title">
        <input
          type="checkbox"
          v-if="optional"
          :checked="checked"
          @change="
            checked = !checked;
            $emit('update:modelValue', $event.target.checked);
          "
        />
        <h3 v-if="header">{{ header }}</h3>
      </div>
      <div class="arrow">
        <img src="@/assets/images/arrow.svg" alt="" />
      </div>
    </div>
    <div class="content" v-show="open"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Panel",
  props: {
    header: String,
    optional: Boolean,
    modelValue: Boolean,
    closed: Boolean
  },
  setup(props) {
    const checked = ref(props.modelValue);
    const open = ref(props.closed ? false : true);

    const handleOpen = (event: { target: HTMLElement }) => {
      if (event.target.tagName === "INPUT") return;
      open.value = !open.value;
    };

    return { checked, open, handleOpen };
  }
});
</script>

<style lang="scss" scoped>
.panel {
  &:first-of-type > .header {
    border-top: none;
  }
  &:not(.open):not(:last-of-type) > .header {
    border-bottom: none;
  }

  &.open .header:hover .arrow {
    opacity: 1;
    transform: rotate(180deg);
  }

  &:not(.open) .header:hover .arrow {
    opacity: 1;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  background: var(--white);
  align-items: center;
  padding: 1.5rem 2rem;
  cursor: pointer;
  user-select: none;

  border: 1px dotted var(--gray-10);
  border: 1px solid var(--gray-10);
  border-left: none;
  border-right: none;

  .title {
    display: flex;
    align-items: center;

    input {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
    }
  }

  .arrow {
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    width: 1rem;
    height: 1rem;
  }
}

.content {
  padding: 2rem;

  > :first-child {
    margin-top: 0;
  }
}

// for optional checkbox
input ~ h3 {
  color: var(--gray-30);
}
input:checked ~ h3 {
  color: var(--black);
}
</style>
