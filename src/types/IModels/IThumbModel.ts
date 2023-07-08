import { IObserver } from "../../types/IObserver";
import { IPositionObj } from "../IConfigurationService/IPositionObj";
export interface IThumbModel {
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
  getContainerWidth(): number;
  setContainerWidth(width: number): void;
  getPercentFromPx(elWidth: number, px: number): number;
  calculatePositionPercent(position: number): number;
  getPositionObj(): IPositionObj;
  setPositionObj(position: number): void;
}
