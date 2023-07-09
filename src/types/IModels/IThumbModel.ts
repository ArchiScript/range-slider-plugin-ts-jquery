import { IObserver } from "../../types/IObserver";
export interface IThumbModel {
  getPosition(): number;
  setPosition(position: number): void;
  enableDrag(): void;
  disableDrag(): void;
  get isDragging(): boolean;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  getThumbSize(): number;
  getMin(): number;
  getMax(): number;
  getContainerWidth(): number;
  getValue(): number;
  setValue(value: number): void;
  getProportion(): number;
  getProportionValue(value: number): number;
}
