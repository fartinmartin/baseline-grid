import { PresetGroup } from "@/types";

export const flattenPresetGroup = (array: PresetGroup[]) => {
  // Typings in comment below work.. but cause headaches 🤷‍♂️

  // export const flattenPresetGroup = (
  //   array: PresetGroup[]
  // ): PagePreset[] | UnitPreset[] => {

  return array
    .map(group => Object.entries(group))
    .flat(2)
    .filter(item => typeof item !== "string" && item)
    .flat();
};

export const roundTo = (n: number, p: number): number => {
  const m = Math.pow(10, p || 0);
  return Math.round(n * m) / m;
};

export const swap = (a: unknown, b: unknown) => {
  const prevA = a;
  const prevB = b;
  a = prevB;
  b = prevA;
};
