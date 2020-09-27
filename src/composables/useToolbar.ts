import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import {
  Orientation,
  PageOption,
  PagePreset,
  PresetGroup,
  UnitOption
} from "@/types";
import { flattenPresetGroup as _fpg, roundTo } from "@/utils";
import { computed, reactive, ref, toRefs, watch } from "vue";

const units: PresetGroup[] = unitPresets;
const pages: PresetGroup[] = pagePresets;

const currentPanel = ref<"ToolbarCalc" | "ToolbarFixes">("ToolbarCalc");

const leading = ref(12);
const unit = ref<UnitOption>("picas");
const preset = ref<PageOption>("letter");
const orientation = ref<Orientation>("portrait");

const dimensions = reactive({
  width: 51,
  height: 66
});

const margins = reactive({
  top: 3,
  bottom: 3
});

export default function useTest() {
  const factor = computed(
    () => _fpg(units).filter(i => i.id === unit.value)[0].factor
  );

  // const unitPreset = computed(
  //   () => _fpg(units).filter(i => i.id === unit.value)[0]
  // );

  const pagePreset = computed(
    () => _fpg(pages).filter(i => i.id === preset.value)[0]
  );

  const step = computed(
    () => _fpg(units).filter(i => i.id === unit.value)[0].step
  );

  const widthPt = computed(() => roundTo(dimensions.width / factor.value, 4));
  const heightPt = computed(() => roundTo(dimensions.height / factor.value, 4));

  const topPt = computed(() => roundTo(margins.top / factor.value, 4));
  const bottomPt = computed(() => roundTo(margins.bottom / factor.value, 4));

  const area = computed(() => heightPt.value - topPt.value - bottomPt.value);
  const lines = computed(() => area.value / leading.value);

  watch(
    () => unit,
    // eslint-disable-next-line
    (unit, prevUnit) => {
      const prevFactor = _fpg(units).filter(i => i.id === prevUnit)[0].factor;

      const prevWidth = roundTo(dimensions.width / prevFactor, 4);
      const prevHeight = roundTo(dimensions.height / prevFactor, 4);

      dimensions.width = roundTo(prevWidth * factor.value, 4);
      dimensions.height = roundTo(prevHeight * factor.value, 4);

      const prevTop = roundTo(margins.top / prevFactor, 4);
      const prevBottom = roundTo(margins.bottom / prevFactor, 4);

      margins.top = roundTo(prevTop * factor.value, 4);
      margins.bottom = roundTo(prevBottom * factor.value, 4);
    }
  );

  watch(
    () => preset,
    // eslint-disable-next-line
    (preset, prevPreset) => {
      // TODO:
      // if !preset.prefersLandscape then see below, else invert width and height!
      dimensions.width = ((pagePreset as unknown) as PagePreset).dimensions.width;
      dimensions.height = ((pagePreset as unknown) as PagePreset).dimensions.height;
    }
  );

  watch(
    dimensions,
    // eslint-disable-next-line
    (dimensions, prevDimensions) => {
      orientation.value =
        dimensions.width > dimensions.height ? "landscape" : "portrait";
      // TODO:
      // if dimensions or inverted dimensions match any preset then preset = preset;
    }
  );

  // const onPaste = async (event: ClipboardEvent, value: Ref) => {
  //   console.log(event.target);
  //   const clipData = event.clipboardData || (window as any).clipboardData;
  //   const text: string = clipData.getData("Text");

  //   let parsedText = 0;

  //   if (text.includes("p")) {
  //     const parts = text.split("p");
  //     parsedText = +parts[0] + +parts[1] / 12;
  //   }

  //   console.log(value, parsedText);

  //   value.value = parsedText;
  // };

  return {
    ...toRefs(dimensions),
    ...toRefs(margins),
    leading,
    unit,
    preset,
    orientation,
    widthPt,
    heightPt,
    topPt,
    bottomPt,
    lines,
    area,
    step,
    // onPaste,
    currentPanel
  };
}
