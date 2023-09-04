export interface ITrackPresenter {
  init(): void;
  update(width: number, height: number): void;
  getTrackStartPoint(): { left: number; top: number };
}
