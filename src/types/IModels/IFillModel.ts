import { IObserver } from "../IObserver";
export interface IFillModel {
  addObserver(observer: IObserver): void;
  getFillWidth(): number;
  setFillWidth(value: number): void;
  getFillStartPosition(): number;
  setFillStartPosition(value: number): void;
  getFillEndPosition(): number;
  setFillEndPosition(value: number): void;
}
