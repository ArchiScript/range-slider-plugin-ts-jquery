import { IObserver } from "../IObserver";
export interface IThumbPresenter {
  init(): void;
  update(value: number): void;
  incrementHandler(): void;
  addObserver(observer: IObserver): void;
  onTrackClick(clickPosition: number): void;
}
