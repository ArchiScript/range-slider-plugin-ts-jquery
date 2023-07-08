import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IObserver } from "../types/IObserver";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
export class RangeSlider implements IRangeSlider {
  private value: number;
  
  private observers: IObserver[] = [];
  private options: IOptions = ConfigService.getInstance().getOptions();

  constructor() {
    this.value = Number(this.options.valueMin);
    this.setValue(this.value);
    console.log(this.value);
    
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
  test<T>(value: T): void {
    console.log(value);
  }
  increment(): void {
    this.value++;
  }
}
