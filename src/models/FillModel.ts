import { IFillModel } from "../types/IModels/IFillModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { IObserver } from "../types/IObserver";
export class FillModel implements IFillModel {
  private fillPosition: number | number[];
  private fillWidth: number;
  private options: IOptions;
  private observers: IObserver[] = [];
  private thumbSize: number;
  constructor() {
    this.options = Config.getInstance().getOptions();
    this.thumbSize = this.options.thumbSize as number;
    this.fillPosition = this.getProportionValue(
      this.options.value as number | number[]
    );

    this.fillWidth = this.calculateFillWidth(this.fillPosition);
  }
  private calculateFillWidth(fillPos: number | number[]): number {
    if (Array.isArray(fillPos)) {
      return fillPos[1] - fillPos[0] + this.thumbSize;
    } else {
      return fillPos + this.thumbSize;
    }
  }
  getFillWidth(): number {
    return this.calculateFillWidth(this.fillPosition);
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
  getProportionValue(value: number | number[]): number | number[] {
    const max: number = this.options.max as number;
    const min: number = this.options.min as number;
    const containerWidth: number = this.options.containerWidth as number;
    if (Array.isArray(value)) {
      return value.map(
        (val) => ((val - min) / (max - min)) * (containerWidth as number)
      );
    }
    const proportionValue = ((value - min) / (max - min)) * containerWidth;
    return proportionValue;
  }
}
