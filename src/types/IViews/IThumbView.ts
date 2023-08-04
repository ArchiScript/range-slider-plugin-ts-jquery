export interface IThumbView {
  render(position: number | number[], value: number | number[]): void;
  addValueChangeListener(listener: Function): void;
  addStartDragListener(listener: Function): void;
  getThumbViewId(): number;
}
