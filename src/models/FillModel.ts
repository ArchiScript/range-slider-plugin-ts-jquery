import { IFillModel } from "../types/IModels/IFillModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { IObserver } from "../types/IObserver";
export class FillModel implements IFillModel {
  private fillWidth: number;
  private startPosition: number;
  private endPosition: number;
  private options: IOptions;
  private observers: IObserver[] = [];
  constructor() {
    this.options = ConfigService.getInstance().getOptions();
    this.fillWidth = this.options.value as number;
    this.startPosition = this.options.min as number;
    this.endPosition = 0;
  }
  getFillWidth(): number {
    return this.fillWidth;
  }
  setFillWidth(value: number): void {
    this.fillWidth = value;
    this.notifyObservers();
  }
  getFillStartPosition(): number {
    return this.startPosition;
  }
  setFillStartPosition(value: number): void {
    this.startPosition = value;
  }
  getFillEndPosition(): number {
    return this.endPosition;
  }
  setFillEndPosition(value: number): void {
    this.endPosition = value;
  }
  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }
  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  private notifyObservers(): void {
    for (let observer of this.observers) {
      observer.update(this.getFillWidth());
    }
  }
}
