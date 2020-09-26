import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import { PageOption, PagePreset, PresetGroup, UnitOption } from "@/types";
import { flattenPresetGroup as _fpg } from "@/utils/flattenPresetGroup";
import { computed, reactive, ref, toRefs, watch } from "vue";

const units: PresetGroup[] = unitPresets;
const pages: PresetGroup[] = pagePresets;

const roundTo = (n: number, p: number): number => {
  const m = Math.pow(10, p || 0);
  return Math.round(n * m) / m;
};

const leading = ref(12);
const unit = ref<UnitOption>("picas");
const preset = ref<PageOption>("letter");

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

  const orientation = computed(() =>
    dimensions.width > dimensions.height ? "landscape" : "portrait"
  );

  const widthPt = computed(() => Math.round(dimensions.width / factor.value));
  const heightPt = computed(() => Math.round(dimensions.height / factor.value));

  const topPt = computed(() => Math.round(margins.top / factor.value));
  const bottomPt = computed(() => Math.round(margins.bottom / factor.value));

  const area = computed(() => heightPt.value - topPt.value - bottomPt.value);
  const lines = computed(() => area.value / leading.value);

  watch(
    () => unit,
    // eslint-disable-next-line
    (unit, prevUnit) => {
      const prevFactor = _fpg(units).filter(i => i.id === prevUnit)[0].factor;

      const prevWidth = Math.round(dimensions.width / prevFactor);
      const prevHeight = Math.round(dimensions.height / prevFactor);

      dimensions.width = roundTo(prevWidth * factor.value, 4);
      dimensions.height = roundTo(prevHeight * factor.value, 4);

      const prevTop = Math.round(margins.top / prevFactor);
      const prevBottom = Math.round(margins.bottom / prevFactor);

      margins.top = roundTo(prevTop * factor.value, 4);
      margins.bottom = roundTo(prevBottom * factor.value, 4);
    }
  );

  watch(
    () => preset,
    // eslint-disable-next-line
    (preset, prevPreset) => {
      dimensions.width = ((pagePreset as unknown) as PagePreset).dimensions.width;
      dimensions.height = ((pagePreset as unknown) as PagePreset).dimensions.height;
    }
  );

  watch(
    () => dimensions,
    // eslint-disable-next-line
    (dimensions, prevDimensions) => {
      // TODO:
      // if dimensions or inverted dimensions match any preset then preset = preset;
    }
  );

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
    step
  };
}
