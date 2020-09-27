import pagePresets from "@/assets/data/page-presets.json";
import unitPresets from "@/assets/data/unit-presets.json";
import { Orientation, PageOption, PresetGroup, UnitOption } from "@/types";
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

  // const currentUnitPreset = computed(
  //   () => _fpg(units).filter(i => i.id === unit.value)[0]
  // );

  const currentPagePreset = computed(
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

  watch(dimensions, d => {
    orientation.value = d.width > d.height ? "landscape" : "portrait";
  });

  // when new unit is selected update measurements to new unit (but keep their absolute values)
  watch(
    [unit, widthPt, heightPt, topPt, bottomPt],
    ([unit], [prevUnit, pW, pH, pT, pB]) => {
      if (unit !== prevUnit) {
        dimensions.width = roundTo(+pW * factor.value, 4);
        dimensions.height = roundTo(+pH * factor.value, 4);
        margins.top = roundTo(+pT * factor.value, 4);
        margins.bottom = roundTo(+pB * factor.value, 4);
      }
    }
  );

  // update dimensions when preset is selected
  watch(preset, () => {
    const pp = currentPagePreset.value;
    let d;

    if (!pp.prefersLandscape) d = pp.dimensions;
    else d = { width: pp.dimensions.height, height: pp.dimensions.width };

    dimensions.width = roundTo(d.width * factor.value, 4);
    dimensions.height = roundTo(d.height * factor.value, 4);
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
  });

  // listen for pastes, then parse any letters and convert as necessary (eg. 41p6 == 46.5 picas)
  // const onPaste = async (event: ClipboardEvent, value: Ref) => {
  //   console.log(event.target);
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
    // onPaste,
    currentPanel
  };
}
