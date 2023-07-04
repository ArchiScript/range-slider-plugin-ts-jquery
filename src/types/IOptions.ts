export interface IOptions {
  orientation?: "horizontal" | "vertical";
  doublePoint?: boolean;
  trackHeight?: number;
  max: number;
  min: number;
  initialMinValue?: number;
  intitialMaxValue?: number;
  ticks?: number;
  step?: number;
  tooltip?: boolean;
  label?: string;
  input?: boolean;
}
