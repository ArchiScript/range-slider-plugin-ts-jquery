import { IObserver } from "../../types/IObserver";
export interface IThumbModel {
  getPosition(): number | number[];
  setPosition(position: number | number[]): void;
  enableDrag(): void;
  disableDrag(): void;
  get isDragging(): boolean;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  getThumbSize(): number;
  getMin(): number;
  getMax(): number;
  getContainerWidth(): number;
  getValue(): number | number[];
  setValue(value: number): void;
  getProportion(): number;
  getProportionValue(value: number | number[]): number | number[];
}
