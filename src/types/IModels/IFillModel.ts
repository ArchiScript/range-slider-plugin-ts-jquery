import { IObserver } from "../IObserver";
export interface IFillModel {
  addObserver(observer: IObserver): void;

  getFillWidth(): number;
  getFillPosition(): number | number[];
  setFillPosition(value: number | number[]): void;
}
