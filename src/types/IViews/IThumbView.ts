export interface IThumbView {
  render(position: number): void;
  addValueChangeListener(listener: Function): void;
  addStartDragListener(listener: Function): void;
}
