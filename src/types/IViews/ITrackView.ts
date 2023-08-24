export interface ITrackView {
  render(width: number, height: number, tickStep: number): void;
  addPositionChangeListener(listener: Function): void;
  getRuler(tickStep: number): HTMLElement;
  getTrackElement(): HTMLElement;
}
