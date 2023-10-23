import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IObserver } from "../types/IObserver";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";
export class RangeSlider implements IRangeSlider {
  private value: number = 0;
  private observers: IObserver[] = [];
  private options!: IOptions;

  constructor() {
    this.options = Config.getInstance().getOptions();
    this.init();
  }

  init(): void {
    this.value = this.options.value as number;
    this.setValue(this.value);
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  setValue(value: number): void {
    this.value = value;
    this.notifyObservers();
  }

  getValue(): number {
    return this.value;
  }

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this.value);
    });
  }
}
