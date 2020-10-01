export interface PresetGroup {
  group: string;
  presets: (UnitPreset | PagePreset)[];
}

interface Preset {
  id: string;
  name: string;
  disabled?: boolean;
}

export interface UnitPreset extends Preset {
  factor: number;
  step?: number;
}

export interface PagePreset extends Preset {
  dimensions: { width: number; height: number };
  abbreviation?: string;
  prefersLandscape?: boolean;
}

export type UnitOption =
  | "points"
  | "picas"
  | "inches"
  | "millimeters"
  | "centimeters"
  | "pixels"
  | "ciceros"
  | "agates"
  | "custom";

export type PageOption =
  | "letter"
  | "legal"
  | "tabloid"
  | "letterHalf"
  | "legalHalf"
  | "A5"
  | "A4"
  | "A3"
  | "B5"
  | "businessCard"
  | "cd"
  | "custom";

export type OrientationOption = "landscape" | "portrait";
export type PanelOption = "ToolbarCalculator" | "ToolbarFixes";
