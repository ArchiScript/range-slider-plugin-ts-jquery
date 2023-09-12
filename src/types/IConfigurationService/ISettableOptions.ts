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
  step: number;
  tooltip: boolean;
  label: string;
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
