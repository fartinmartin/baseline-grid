import pagePresetsRaw from "@/assets/data/page-presets.json";
import unitPresetsRaw from "@/assets/data/unit-presets.json";
import { Orientation, PageOption, PresetGroup, UnitOption } from "@/types";
import { computed, reactive, toRefs } from "vue";

const unitPresets: PresetGroup[] = unitPresetsRaw;
const pagePresets: PresetGroup[] = pagePresetsRaw;

const page = reactive({
  width: 51,
  height: 66,
  orientation: "portrait" as Orientation,
  unit: "picas" as UnitOption,
  preset: "letter" as PageOption
});

const margins = reactive({
  top: 36,
  bottom: 36
});

const typography = reactive({
  typography: {
    fontSize: 12,
    leading: 14.4
  }
});

// const flattenPreset = (d: PresetGroup[]): UnitPrest[] | PagePreset[] => { // why does this not work??
const flattenPreset = (d: PresetGroup[]) => {
  return d
    .map(p => Object.entries(p))
    .flat(2)
    .filter(i => typeof i !== "string" && i)
    .flat();
};

export default function useToolbar() {
  const factor = computed(() => {
    return flattenPreset(unitPresets).filter(i => i.id === page.unit)[0].factor;
  });

  const dimensions = computed(() => {
    const preset = flattenPreset(pagePresets).filter(i => i.id === page.preset);
    return { width: preset[0].width, height: preset[0].height };
  });

  const widthInPoints = computed(() => Math.round(page.width * factor.value));
  const heightInPoints = computed(() => Math.round(page.height * factor.value));

  const updateWidth = (width: number) =>
    (page.width = Math.round(width / factor.value));
  const updateHeight = (height: number) =>
    (page.height = Math.round(height / factor.value));

  const updateOrientation = (o: Orientation) => (page.orientation = o);
  const updateUnit = (unit: UnitOption) => (page.unit = unit);
  const updatePreset = (preset: PageOption) => {
    page.preset = preset;
    updateWidth(dimensions.value.width);
    updateHeight(dimensions.value.height);
    // const orientation = preset.prefersLandscape ? 'landscape' : 'portrait';
    // updateOrientation(orientation)
  };

  // if (width && height || height && width pairing is found in pagePresets) {
  //   updatePreset()
  //   updateOrientation() based on if width is > or < than height
  // }

  return {
    ...toRefs(page),
    widthInPoints,
    heightInPoints,
    updateWidth,
    updateHeight,
    updatePreset,
    updateUnit,
    updateOrientation
  };
}
