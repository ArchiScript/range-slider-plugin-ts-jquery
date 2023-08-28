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
  getContainerHeight(): number;
  getValue(): number | number[];
  setValue(value: number | number[]): void;
  getProportion(): number;
  convertToPosition(value: number | number[]): number | number[];
  getStep(): number;
  convertToValue(value: number | number[]): number | number[];
  getValueString(value: number | number[]): string | string[] | undefined;
  convertToPositionReversed(value: number | number[]): number | number[];
}
