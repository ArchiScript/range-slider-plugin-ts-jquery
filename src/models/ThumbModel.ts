import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
export class ThumbModel implements IThumbModel {
  private position: number;
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number = 15;
  private min: number = 0;
  private max: number = 200;

  constructor() {
    this.position = 0;
    this.max -= this.thumbSize;
  }
  getThumbSize(): number {
    return this.thumbSize;
  }
  getMin(): number {
    return this.min;
  }
  getMax(): number {
    return this.max;
  }
  getPosition(): number {
    return this.position;
  }
  setPosition(position: number): void {
    this.position = position;
    this.notifyObservers();
  }

  enableDrag(): void {
    this.dragging = true;
  }
  get isDragging(): boolean {
    return this.dragging;
  }
  disableDrag(): void {
    this.dragging = false;
  }
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
