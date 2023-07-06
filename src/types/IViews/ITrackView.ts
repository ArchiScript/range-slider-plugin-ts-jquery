export interface ITrackView {
  render(width: number, height: number): void;
  addPositionChangeListener(listener: Function): void;
}
