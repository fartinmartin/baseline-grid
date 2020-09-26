import { PresetGroup } from "@/types";

// Typings in comment below work.. but cause headaches 🤷‍♂️

// export const flattenPresetGroup = (
//   array: PresetGroup[]
// ): PagePreset[] | UnitPreset[] => {

export const flattenPresetGroup = (array: PresetGroup[]) => {
  return array
    .map(group => Object.entries(group))
    .flat(2)
    .filter(item => typeof item !== "string" && item)
    .flat();
};
