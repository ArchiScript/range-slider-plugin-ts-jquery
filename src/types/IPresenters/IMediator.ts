export interface IMediator {
  notifyTrackClick(clickPosition: number): void;
  notifyThumbPositionChange(position: number): void;
  setFill(position: number): void;
}
