import { IObserver } from "../IObserver";
import { IOptions } from "../IConfigurationService/IOptions";
export interface IRangeSlider {
  setValue(value: number): void;
  getValue(): number;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
}
