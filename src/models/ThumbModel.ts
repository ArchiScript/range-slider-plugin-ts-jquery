import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
export class ThumbModel implements IThumbModel {
  private position: number;
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number = 15;
  private min: number;
  private max: number;
  // private valueMin: number;
  private options: IOptions = ConfigService.getInstance().getOptions();

  constructor() {
    this.min = Number(this.options.min);
    this.max = Number(this.options.max);
    this.position = Number(this.options.valueMin);
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
