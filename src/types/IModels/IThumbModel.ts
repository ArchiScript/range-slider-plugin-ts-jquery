import { IObserver } from "../../types/IObserver";
export interface IThumbModel {
  getPosition(): number;
  setPosition(position: number): void;
  enableDrag(): void;
  disableDrag(): void;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  incrementPos(): void;
}
