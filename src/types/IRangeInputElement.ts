interface IRangeInputElement {
  element: HTMLInputElement;
  value: number;
  startValue?: number;
  endValue?: number;
  setValue(value: number): void;
}
