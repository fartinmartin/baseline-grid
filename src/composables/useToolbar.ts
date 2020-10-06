import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import {
  OrientationOption,
  PageOption,
  PagePreset,
  PanelOption,
  UnitOption,
  UnitPreset
} from "@/types";
import { flattenPresetGroup } from "@/utils";
import { computed, reactive, watch } from "vue";

const units = flattenPresetGroup(unitPresets); // unitPresets: PresetGroup[]
const pages = flattenPresetGroup(pagePresets); // pagePresets: PresetGroup[]

const global = reactive({
  checkGrid: false,
  isPreviewing: false,
  leading: 12,
  unit: "points" as UnitOption,
  preset: "letter" as PageOption,
  robotNote: false
});

const current = reactive({
  panel: "ToolbarCalculator" as PanelOption,
  unit: computed((): UnitPreset => units.find(i => i.id === global.unit)),
  page: computed((): PagePreset => pages.find(i => i.id === global.preset)),
  factor: computed((): number => current.unit.factor),
  step: computed((): number | undefined => current.unit.step),
  closedPanels: [] as string[]
});

const dimensions = reactive({
  width: 612,
  height: 792,
  orientation: "portrait" as OrientationOption,
  widthPt: computed((): number => dimensions.width / current.factor),
  heightPt: computed((): number => dimensions.height / current.factor)
});

const margins = reactive({
  top: 36,
  bottom: 36,
  topPt: computed((): number => margins.top / current.factor),
  bottomPt: computed((): number => margins.bottom / current.factor),
  lines: computed((): number => margins.safe / global.leading),
  safe: computed(
    (): number => dimensions.heightPt - margins.topPt - margins.bottomPt
  )
});

const grid = reactive({
  gutter: 12,
  rows: 6,
  rowSize: computed(
    (): number => (margins.safe - grid.gutter * (grid.rows - 1)) / grid.rows
  )
});

const preview = reactive({
  leading: 12,
  top: 36,
  bottom: 48,
  gutter: 12,
  rows: 6,
  safe: computed(
    (): number => dimensions.heightPt - preview.top - preview.bottom
  ),
  rowSize: NaN
  // rowSize: computed(
  //   (): number =>
  //     (preview.safe - preview.gutter * (preview.rows - 1)) / preview.rows
  // )
});

const isPassing = reactive({
  baseline: computed((): boolean => Number.isInteger(margins.lines)),
  grid: computed(
    (): boolean =>
      grid.rowSize % global.leading === 0 && grid.gutter % global.leading === 0
  ),
  all: computed((): boolean =>
    global.checkGrid ? isPassing.grid && isPassing.baseline : isPassing.baseline
  )
});

export default function useTest() {
  watch(dimensions, d => {
    dimensions.orientation = d.width > d.height ? "landscape" : "portrait";
  });

  // when new unit is selected update measurements to new unit (but keep their absolute values)
  watch(
    [
      () => global.unit,
      () => dimensions.widthPt,
      () => dimensions.heightPt,
      () => margins.topPt,
      () => margins.bottomPt
    ],
    ([unit], [prevUnit, pW, pH, pT, pB]) => {
      if (unit !== prevUnit) {
        dimensions.width = +pW * current.factor;
        dimensions.height = +pH * current.factor;
        margins.top = +pT * current.factor;
        margins.bottom = +pB * current.factor;
      }
    }
  );

  // update dimensions when preset is selected
  watch(
    () => global.preset,
    () => {
      if (global.preset === "custom") return;

      const pp = current.page;
      let d;

      if (!pp.prefersLandscape) d = pp.dimensions;
      else d = { width: pp.dimensions.height, height: pp.dimensions.width };

      dimensions.width = d.width * current.factor;
      dimensions.height = d.height * current.factor;
    }
  );

  // if dimensions match a preset, update preset
  watch(
    [() => dimensions.widthPt, () => dimensions.heightPt],
    ([width, height]) => {
      const directMatch = pages.find(
        i => i.dimensions.height === height && i.dimensions.width === width
      );
      const invertMatch = pages.find(
        i => i.dimensions.height === width && i.dimensions.width === height
      );

      if (directMatch || invertMatch)
        global.preset = directMatch?.id || invertMatch?.id;
      else global.preset = "custom";
    }
  );

  // when leading changes, update gutter to match (TODO: use previous value to determine factor?)
  watch(
    () => global.leading,
    leading => (grid.gutter = leading)
  );

  // listen for pastes, then parse any letters and convert as necessary (eg. 41p6 == 46.5 picas)
  // const onPaste = async (event: ClipboardEvent, value: Ref) => {
  //   do stuff
  // };

  return {
    global,
    current,
    dimensions,
    margins,
    grid,
    preview,
    isPassing
  };
}
