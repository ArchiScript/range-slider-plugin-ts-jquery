export interface IThumbView {
  render(
    position: number | number[],
    value: number | number[],
    stringValue?: string
  ): void;
  addValueChangeListener(listener: Function): void;
  addStartDragListener(listener: Function): void;
  getThumbViewId(): number;
  getThumbElement(): HTMLElement;
  getTooltipElement(): HTMLElement;
  // updateOptions(): void;
  updateOptions(id: number): void;
}
