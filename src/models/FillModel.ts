import { IFillModel } from "../types/IModels/IFillModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";
import { IObserver } from "../types/IObserver";
export class FillModel implements IFillModel {
  private fillPosition: number | number[] = 0;
  private fillLength: number = 0;
  private thumbSize: number = 0;
  private options: IOptions;
  private observers: IObserver[] = [];

  constructor() {
    this.options = Config.getInstance().getOptions();
    this.init();
  }
  init(): void {
    this.thumbSize = this.options.thumbSize as number;
    this.fillPosition = this.convertToFillPosition(
      this.options.value as number | number[]
    );
    this.fillLength = this.calculateFillLength(this.fillPosition);
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  calculateFillLength(fillPos: number | number[]): number {
    if (Array.isArray(fillPos)) {
      return fillPos[1] - fillPos[0] + this.thumbSize;
    } else {
      const isHorizontal = this.options.orientation === "horizontal";
      const isReversed = this.options.reversedOrder;
      const containerSize = isHorizontal
        ? (this.options.containerWidth as number)
        : (this.options.pluginHeight as number);

      if (isHorizontal && !isReversed) {
        return fillPos + this.thumbSize;
      } else if (isHorizontal && isReversed) {
        return containerSize - fillPos;
      } else if (!isHorizontal && !isReversed) {
        return fillPos + this.thumbSize;
      } else {
        return containerSize - fillPos;
      }
    }
  }
  getFillWidth(): number {
    return this.calculateFillLength(this.fillPosition);
  }

  getFillPosition(): number | number[] {
    return this.fillPosition;
  }
  setFillPosition(value: number | number[]): void {
    this.fillPosition = value;
    this.notifyObservers();
  }

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }
  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  private notifyObservers(): void {
    for (let observer of this.observers) {
      observer.update(this.getFillPosition());
    }
  }
  convertToFillPosition(value: number | number[]): number | number[] {
    const max: number = this.options.max as number;
    const min: number = this.options.min as number;
    const containerSize =
      this.options.orientation === "horizontal"
        ? (this.options.containerWidth as number)
        : (this.options.pluginHeight as number);

    if (Array.isArray(value)) {
      return value.map(
        (val) => ((val - min) / (max - min)) * (containerSize as number)
      );
    }
    const proportionValue = ((value - min) / (max - min)) * containerSize;
    return proportionValue;
  }
}
