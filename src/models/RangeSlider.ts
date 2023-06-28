import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IObserver } from "../types/IObserver";

export class RangeSlider implements IRangeSlider {
  private value: number = 0;
  // private rightValue: number = 100;
  private observers: IObserver[] = [];

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
