import { IObserver } from "../../types/IObserver";
export interface ITrackModel {
  width: number;
  height: number;
  getWidth(): number;
  setWidth(width: number): void;
  getHeight(): number;
  setHeight(height: number): void;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
}
