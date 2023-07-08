export interface IRangeSliderView {
  render(value: number): void;
  addValueChangeListener(listener: Function): void;
  getContainerWidth(): number;
}
