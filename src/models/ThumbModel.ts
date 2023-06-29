import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
export class ThumbModel implements IThumbModel {
  private position: number;
  private observers: IObserver[] = [];

  constructor() {
    this.position = 0;
  }

  getPosition(): number {
    return this.position;
  }
  setPosition(position: number): void {
    this.position = position;
    this.notifyObservers();
  }

  enableDrag(): void {}
  disableDrag(): void {}
  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.position);
    }
  }
  incrementPos(): void {
    this.position++;
  }
}
