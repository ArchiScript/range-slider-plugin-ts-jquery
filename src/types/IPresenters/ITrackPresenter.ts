export interface ITrackPresenter {
  init(): void;
  update(width: number, height: number): void;
  onThumbPositionChange(position: number): void;
  removeTrailingZeros(number: number): { num: number; grade: number };
}
