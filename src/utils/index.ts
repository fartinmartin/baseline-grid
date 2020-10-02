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

export const fractionStrToDecimal = (str: string) =>
  str.split("/").reduce((p, c) => p / +c, 0);

export const factors = (n: number): number[] =>
  [...Array(n + 1).keys()].filter(i => n % i === 0);

export const multiples = (number: number, max: number): number[] => {
  const multiples = [];
  for (let i = 0; i < max; i++) {
    multiples.push(number * i);
  }
  return multiples;
};

export const closest = (
  array: number[],
  target: number
): { high: number; low: number } => {
  const payload: { high: number; low: number } = { high: NaN, low: NaN };

  const result = array.reduce((a, b) =>
    Math.abs(b - target) < Math.abs(a - target) ? b : a
  );

  if (result > target) {
    payload.high = result;
    payload.low = array[array.indexOf(result) - 1];
  } else {
    payload.high = array[array.indexOf(result) + 1];
    payload.low = result;
  }

  return payload;
};
