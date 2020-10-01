import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import {
  OrientationOption,
  PageOption,
  PanelOption,
  PresetGroup,
  UnitOption
} from "@/types";
import { flattenPresetGroup as _fpg } from "@/utils";
import { computed, reactive, toRefs, watch } from "vue";

const units: PresetGroup[] = unitPresets;
const pages: PresetGroup[] = pagePresets;

const global = reactive({
  currentPanel: "ToolbarCalculator" as PanelOption,
  leading: 12,
  unit: "points" as UnitOption,
  preset: "letter" as PageOption,
  orientation: "portrait" as OrientationOption,
  checkGrid: false // update this variable name across components
});

const dimensions = reactive({
  width: 612,
  height: 792
});

const margins = reactive({
  top: 36,
  bottom: 48
});

const grid = reactive({
  gutter: 12,
  rows: 6
});

export default function useTest() {
  const factor = computed(
    () => _fpg(units).filter(i => i.id === global.unit)[0].factor
  );

  const currentUnitPreset = computed(
    () => _fpg(units).filter(i => i.id === global.unit)[0]
  );

  const currentPagePreset = computed(
    () => _fpg(pages).filter(i => i.id === global.preset)[0]
  );

  const step = computed(
    () => _fpg(units).filter(i => i.id === global.unit)[0].step
  );

  const widthPt = computed(() => dimensions.width / factor.value);
  const heightPt = computed(() => dimensions.height / factor.value);

  const topPt = computed(() => margins.top / factor.value);
  const bottomPt = computed(() => margins.bottom / factor.value);

  const area = computed(() => heightPt.value - topPt.value - bottomPt.value);
  const lines = computed(() => area.value / global.leading);

  const rowSize = computed(
    () => (area.value - grid.gutter * (grid.rows - 1)) / grid.rows
  );

  const baselineIsPassing = computed(() => Number.isInteger(lines.value));
  const gridIsPassing = computed(() => rowSize.value % global.leading === 0);
  const isPassing = computed(() =>
    global.checkGrid
      ? gridIsPassing.value && baselineIsPassing.value
      : baselineIsPassing.value
  );

  watch(dimensions, d => {
    global.orientation = d.width > d.height ? "landscape" : "portrait";
  });

  // when new unit is selected update measurements to new unit (but keep their absolute values)
  watch(
    [() => global.unit, widthPt, heightPt, topPt, bottomPt],
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
  watch(
    () => global.preset,
    () => {
      if (global.preset === "custom") return;
      const pp = currentPagePreset.value;
      let d;

      if (!pp.prefersLandscape) d = pp.dimensions;
      else d = { width: pp.dimensions.height, height: pp.dimensions.width };

      dimensions.width = d.width * factor.value;
      dimensions.height = d.height * factor.value;
    }
  );

  // if dimensions match a preset, update preset
  watch([widthPt, heightPt], ([width, height]) => {
    const directMatch = _fpg(pages).find(
      i => i.dimensions.height === height && i.dimensions.width === width
    );
    const invertMatch = _fpg(pages).find(
      i => i.dimensions.height === width && i.dimensions.width === height
    );

    if (directMatch || invertMatch)
      global.preset = directMatch?.id || invertMatch?.id;
    else global.preset = "custom";
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
    ...toRefs(global),
    ...toRefs(dimensions),
    ...toRefs(margins),
    ...toRefs(grid),
    widthPt,
    heightPt,
    topPt,
    bottomPt,
    lines,
    area,
    step,
    currentPagePreset,
    currentUnitPreset,
    rowSize,
    baselineIsPassing,
    gridIsPassing,
    isPassing
  };
}
