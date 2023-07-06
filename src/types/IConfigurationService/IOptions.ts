export interface IOptions {
  orientation?: "horizontal" | "vertical";
  doublePoint?: boolean;
  trackHeight?: number;
  max?: number;
  min?: number;
  valueMin?: number;
  valueMax?: number;
  ticks?: number;
  step?: number;
  tooltip?: boolean;
  label?: string;
  input?: boolean;
}
