export interface IOptions {
  orientation?: "horizontal" | "vertical";
  doublePoint?: boolean;
  trackHeight?: number;
  max?: number;
  min?: number;
  thumbSize?: number;
  value?: number | number[];
  ticks?: boolean;
  tickStep?: number;
  maxTicks?: number;
  step?: number;
  tooltip?: boolean;
  label?: boolean;
  labelString?: string;
  valueInLabel?: boolean;
  input?: boolean;
  containerWidth?: number;
  containerHeight?: number;
  containerViewportLeft?: number;
  containerViewportTop?: number;
  instanceId?: number;
  stringValues?: string[];
  reversedOrder?: boolean;
  thumbColor?: string;
  trackColor?: string;
  fillColor?: string;
  tooltipColor?: string;
  rulerColor?: string;
  tickFontSize?: number;
  tooltipForm?: "square" | "round";
  fill?: boolean;
  tickBar?: boolean;
  labelStyles?: LabelStyles;
  pluginHeight?: number;
}

export type LabelStyles = {
  height: number;
  marginTop: number;
  marginBottom: number;
};
