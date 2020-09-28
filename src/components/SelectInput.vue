<template>
  <div class="input-group">
    <label v-if="!append">{{ label }}</label>
    <div
      class="select-input"
      :class="{ append, freeze: freeze }"
      :tabindex="tabindex"
      @blur="open = false"
    >
      <div class="selected" :class="{ open: open }" @click="open = !open">
        <span>{{
          selectedName === "Millimeters"
            ? "mm"
            : selectedName === "Centimeters"
            ? "cm"
            : selectedName
        }}</span>
        <div v-if="!freeze" class="arrow">
          <img src="@/assets/images/arrow.svg" />
        </div>
      </div>
      <div class="options" v-show="open">
        <div class="option-group" v-for="group in options" :key="group.group">
          <div
            v-for="preset in group.presets"
            :key="preset.id"
            @click="onSelected(preset.id)"
            class="option"
            :class="{ disabled: preset.disabled }"
          >
            {{ preset.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useToolbar from "@/composables/useToolbar";

export default defineComponent({
  name: "SelectInput",
  props: {
    selected: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true,
      default: "label"
    },
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    append: {
      type: Boolean,
      required: false,
      default: false
    },
    freeze: {
      type: String
    }
  },
  setup(props, { emit }) {
    const open = ref(false);
    const { currentPagePreset, currentUnitPreset } = useToolbar();
    const selectedName = computed(() =>
      props.append
        ? props.freeze
          ? props.freeze
          : currentUnitPreset.value.name
        : currentPagePreset.value.name
    );

    const onSelected = (option: string) => {
      open.value = false;
      emit("update:selected", option);
    };
    return { open, selectedName, onSelected };
  }
});
</script>

<style lang="scss" scoped>
.select-input {
  position: relative;
  width: 100%;
  height: var(--input-height);
  border-radius: var(--border-radius);

  &:focus {
    outline: none;

    > .selected {
      border: 2px solid var(--active-color);
      box-shadow: 0 0 4px 4px var(--active-color-light);
    }
  }

  &.append {
    .selected {
      border: none;
      background: var(--gray-00);
      text-transform: lowercase;

      height: var(--num-input-height);

      &:hover {
        background: var(--gray-10);
      }
    }

    .options {
      width: 269px;
      left: initial;
      right: 0;
    }

    &:focus {
      outline: none;

      > .selected {
        border: none;
        box-shadow: none;
      }
    }
  }

  &.freeze {
    pointer-events: none;
  }
}

.select-input .selected {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
  height: 100%;

  background-color: var(--white);
  border: 2px solid var(--gray-10);
  border-radius: var(--border-radius);

  cursor: pointer;
  user-select: none;

  /* &:hover {
    background: var(--gray-00);
  } */

  .arrow {
    transition: transform 0.3s ease;
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;

    svg {
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &.open {
    border: 2px solid var(--active-color);
    box-shadow: 0 0 4px 4px var(--active-color-light);

    .arrow {
      transform: rotate(180deg);
    }
  }
}

.select-input .options {
  position: absolute;
  left: 0;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 10;

  overflow: hidden;
  background: var(--white);

  /* border-radius: 0px 0px var(--border-radius) var(--border-radius); */
  border-radius: var(--border-radius);
  border: 2px solid var(--gray-00);
  box-shadow: 0 0 4px 4px var(--active-color-light);

  .option-group {
    border-top: 1px dotted var(--gray-10);
    padding: 0.75rem 0;

    &:first-of-type {
      border-top: none;
    }
  }

  .option {
    padding: 0.25rem 1rem;
    &:hover {
      cursor: pointer;
      background-color: var(--gray-00);
    }

    &.disabled {
      color: var(--gray-30);
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}
</style>
