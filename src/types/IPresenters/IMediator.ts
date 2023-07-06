export interface IMediator {
  notifyTrackClick(clickPosition: number): void;
  notifyThumbPositionChange(position: number): void;
}
