import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import {
  OrientationOption,
  PageOption,
  PresetGroup,
  UnitOption
} from "@/types";
import { flattenPresetGroup as _fpg } from "@/utils";
import { computed, reactive, ref, toRefs, watch } from "vue";

const units: PresetGroup[] = unitPresets;
const pages: PresetGroup[] = pagePresets;

// const global = reactive({
//   currentPanel: "ToolbarCalculator" as PanelOption,
//   unit: "picas" as UnitOption, // switch to points eventually
//   preset: "letter" as PageOption,
//   orientation: "portrait" as OrientationOption,
//   checkGrid: false // update this variable name across components
// });

const currentPanel = ref<"ToolbarCalculator" | "ToolbarFixes">(
  "ToolbarCalculator"
);

const leading = ref(12);
const unit = ref<UnitOption>("picas");
const preset = ref<PageOption>("letter");
const orientation = ref<OrientationOption>("portrait");

const dimensions = reactive({
  width: 51,
  height: 66
});

const margins = reactive({
  top: 3,
  bottom: 4
});

// const grid = reactive({
//   gutter: 12,
//   rows: 6,
// })

const gutter = ref(12);
const rows = ref(6);
const checkMyGridRows = ref(false);

export default function useTest() {
  const factor = computed(
    () => _fpg(units).filter(i => i.id === unit.value)[0].factor
  );

  const currentUnitPreset = computed(
    () => _fpg(units).filter(i => i.id === unit.value)[0]
  );

  const currentPagePreset = computed(
    () => _fpg(pages).filter(i => i.id === preset.value)[0]
  );

  const step = computed(
    () => _fpg(units).filter(i => i.id === unit.value)[0].step
  );

  const widthPt = computed(() => dimensions.width / factor.value);
  const heightPt = computed(() => dimensions.height / factor.value);

  const topPt = computed(() => margins.top / factor.value);
  const bottomPt = computed(() => margins.bottom / factor.value);

  const area = computed(() => heightPt.value - topPt.value - bottomPt.value);
  const lines = computed(() => area.value / leading.value);

  const rowSize = computed(
    () => (area.value - gutter.value * (rows.value - 1)) / rows.value
  );

  const baselineIsPassing = computed(() => Number.isInteger(lines.value));
  const gridIsPassing = computed(() => rowSize.value % leading.value === 0);
  const isPassing = computed(() =>
    checkMyGridRows.value
      ? gridIsPassing.value && baselineIsPassing.value
      : baselineIsPassing.value
  );

  watch(dimensions, d => {
    orientation.value = d.width > d.height ? "landscape" : "portrait";
  });

  // when new unit is selected update measurements to new unit (but keep their absolute values)
  watch(
    [unit, widthPt, heightPt, topPt, bottomPt],
    ([unit], [prevUnit, pW, pH, pT, pB]) => {
      if (unit !== prevUnit) {
        dimensions.width = +pW * factor.value;
        dimensions.height = +pH * factor.value;
        margins.top = +pT * factor.value;
        margins.bottom = +pB * factor.value;
      }
    }
  );

  // update dimensions when preset is selected
  watch(preset, () => {
    if (preset.value === "custom") return;
    const pp = currentPagePreset.value;
    let d;

    if (!pp.prefersLandscape) d = pp.dimensions;
    else d = { width: pp.dimensions.height, height: pp.dimensions.width };

    dimensions.width = d.width * factor.value;
    dimensions.height = d.height * factor.value;
  });

  // if dimensions match a preset, update preset
  watch([widthPt, heightPt], ([width, height]) => {
    const directMatch = _fpg(pages).find(
      i => i.dimensions.height === height && i.dimensions.width === width
    );
    const invertMatch = _fpg(pages).find(
      i => i.dimensions.height === width && i.dimensions.width === height
    );

    if (directMatch || invertMatch)
      preset.value = directMatch?.id || invertMatch?.id;
    else preset.value = "custom";
  });

  // listen for pastes, then parse any letters and convert as necessary (eg. 41p6 == 46.5 picas)
  // const onPaste = async (event: ClipboardEvent, value: Ref) => {
  //   const clipData = event.clipboardData || (window as any).clipboardData;
  //   const text: string = clipData.getData("Text");

  //   let parsedText = 0;

  //   if (text.includes("p")) {
  //     const parts = text.split("p");
  //     parsedText = +parts[0] + +parts[1] / 12;
  //   }

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
    gutter,
    rows,
    // onPaste,
    currentPanel,
    currentPagePreset,
    currentUnitPreset,
    checkMyGridRows,
    rowSize,
    baselineIsPassing,
    gridIsPassing,
    isPassing
  };
}
