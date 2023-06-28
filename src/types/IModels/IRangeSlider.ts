import { IObserver } from "../IObserver";
export interface IRangeSlider {
  setValue(value: number): void;
  getValue(): number;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  increment(): void;
}
