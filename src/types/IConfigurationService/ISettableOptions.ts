export interface ISettableOptions {
  orientation: "horizontal" | "vertical";
  doublePoint: boolean;
  trackHeight: number;
  max: number;
  min: number;
  thumbSize: number;
  value: number | number[];
  ticks: boolean;
  tickStep: number;
  maxTicks: number;
  step: number;
  tooltip: boolean;
  label: boolean;
  labelString: string;
  valueInLabel: boolean;
  stringValues: string[];
  reversedOrder: boolean;
  thumbColor: string;
  trackColor: string;
  fillColor: string;
  tooltipColor: string;
  rulerColor: string;
  tickFontSize: number;
  tooltipForm: "square" | "round";
  fill: boolean;
  tickBar: boolean;
}

type StringKeys<T> = {
  [K in keyof T as string]: T[K];
};
export type StringKeysSettableOptions = StringKeys<ISettableOptions>;

export type PropertyTypes<T> = {
  [K in keyof T]: T[K] extends string
    ? "string"
    : T[K] extends string | string
    ? "string"
    : T[K] extends number
    ? "number"
    : T[K] extends boolean
    ? "boolean"
    : T[K] extends (infer U)[]
    ? U[]
    : T[K];
};

export type PropertyTypedOptions = PropertyTypes<ISettableOptions>;
