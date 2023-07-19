import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
export class ThumbModel implements IThumbModel {
  private position: number | number[];
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number;
  private min: number;
  private max: number;
  private value?: number | number[];
  private containerWidth: number;
  private options: IOptions = ConfigService.getInstance().getOptions();

  constructor() {
    this.min = this.options.min as number;
    this.max = this.options.max as number;
    this.thumbSize = this.options.thumbSize as number;
    this.position = this.options.value as number | number[];
    this.containerWidth = this.getContainerWidth() - this.thumbSize;

    this.value = this.options.value ? this.options.value : (0 as number);

    this.test();
  }

  // ===========test====
  test(): void {
    console.log(
      `containerWidth: ${
        this.containerWidth
      }====Position:${this.getPosition()}====Proportion=== ${this.getProportionValue(
        this.position
      )}=====Value:${this.getValue()}`
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
  getPosition(): number | number[] {
    return this.position;
  }
  setPosition(position: number | number[]): void {
    this.position = position;
    // this.notifyObservers();
  }

  setValue(value: number): void {
    this.value = Math.round(value / this.getProportion());
    this.notifyObservers();
  }
  getValue(): number | number[] {
    if (Array.isArray(this.value)) {
      return this.value as number[];
    }
    return this.value as number;
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
      if (Array.isArray(this.value)) {
        this.value.forEach((val) => observer.update(val));
      } else if (this.value && typeof this.value == "number") {
        observer.update(this.value);
      }
    }
  }

  getContainerWidth(): number {
    return this.options.containerWidth as number;
  }

  getProportionValue(value: number | number[]): number | number[] {
    const max = this.getMax();
    const min = this.getMin();
    if (Array.isArray(value)) {
      return value.map(
        (val) => ((val - min) / (max - min)) * this.containerWidth
      );
    }
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
