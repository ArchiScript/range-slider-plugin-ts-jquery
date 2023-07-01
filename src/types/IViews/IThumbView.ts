export interface IThumbView {
  render(value: number): void;
  addValueChangeListener(listener: Function): void;
  addStartDragListener(listener: Function): void;
}
