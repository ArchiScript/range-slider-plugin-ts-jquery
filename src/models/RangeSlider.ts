import { IRangeSlider } from "../types/IRangeSlider";
import { IObserver } from "../types/IObserver";

class RangeSlider implements IRangeSlider {
  private leftValue: number = 0;
  private rightValue: number = 100;
  private observers: IObserver[] = [];

  setValue(value: number): void {
    this.rightValue = value;
    this.notifyObservers();
  }

  getValue(): number {
    return this.leftValue;
  }

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this.leftValue, this.rightValue);
    });
  }
}
