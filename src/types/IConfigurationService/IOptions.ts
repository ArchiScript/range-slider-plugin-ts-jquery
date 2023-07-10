export interface IOptions {
  orientation?: "horizontal" | "vertical";
  doublePoint?: boolean;
  trackHeight?: number;
  max?: number;
  min?: number;
  thumbSize?: number;
  value?: number | number[];
  ticks?: number;
  step?: number;
  tooltip?: boolean;
  label?: string;
  input?: boolean;
  containerWidth?: number;
}
