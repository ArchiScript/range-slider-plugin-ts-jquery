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
  private value: number;
  private containerWidth: number;
  private options: IOptions = ConfigService.getInstance().getOptions();

  constructor() {
    this.min = this.options.min as number;
    this.max = this.options.max as number;
    this.position = this.options.value as number;
    this.containerWidth = this.getContainerWidth() - this.getThumbSize();

    this.value = this.options.value as number;

    this.test();
  }

  // ===========test====
  test(): void {
    console.log(
      `containerWidth: ${this.containerWidth}====Position:${
        this.position
      }====Proportion=== ${this.getProportionValue(this.position)}`
    );
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
    // this.notifyObservers();
  }

  setValue(value: number): void {
    this.value = Math.round(value / this.getProportion());
    this.notifyObservers();
  }
  getValue(): number {
    return this.value;
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
      observer.update(this.value);
    }
  }

  getContainerWidth(): number {
    return this.options.containerWidth as number;
  }

  getProportionValue(value: number): number {
    const max = this.getMax();
    const min = this.getMin();
    const proportionValue = ((value - min) / (max - min)) * this.containerWidth;
    return proportionValue;
  }
  getProportion(): number {
    const max = this.getMax();
    const min = this.getMin();
    const proportion = this.containerWidth / (max - min);
    return proportion;
  }
}
