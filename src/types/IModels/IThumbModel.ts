import { IObserver } from "../../types/IObserver";
export interface IThumbModel {
  // getCurrentPosition(): number;
  // setCurrentPosition(position: number): void;
  // getInitialPosition(): number;
  // setInitialPosition(position: number): void;
  getPosition(): number;
  setPosition(position: number): void;
  enableDrag(): void;
  disableDrag(): void;
  get isDragging(): boolean;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  incrementPos(): void;
  getThumbSize(): number;
  getMin(): number;
  getMax(): number;
}
