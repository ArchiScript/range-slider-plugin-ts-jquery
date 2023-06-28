import { IObserver } from "../../types/IObserver";
export interface IThumbModel {
  $element: HTMLElement;
  position: number;
  getPosition(): number;
  setPosition(position: number): void;
  enableDrag(): void;
  disableDrag(): void;
  updatePosition(position: number): void;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
}
