export interface IMediator {
  notifyTrackClick(clickPosition: number): void;
  notifyThumbPositionChange(position: number): void;
  notifyFillPosition(position: number | number[]): void;
}
