import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
export class ThumbModel implements IThumbModel {
  private position: number | number[];
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number;
  private min: number;
  private max: number;
  private value?: number | number[];
  private containerWidth: number;
  private step: number;
  private options: IOptions = Config.getInstance().getOptions();

  constructor() {
    this.min = this.options.min as number;
    this.max = this.options.max as number;
    this.step = this.options.step as number;
    this.thumbSize = this.options.thumbSize as number;
    // this.position = this.options.value as number | number[];
    this.position = this.getProportionValue(
      this.options.value as number | number[]
    );
    this.containerWidth = this.getContainerWidth() - this.thumbSize;

    this.value = this.options.value ? this.options.value : (0 as number);

    // this.test();
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
  getStep(): number {
    return this.step * this.getProportion();
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
    this.value = this.posToValProportion(position);
    this.notifyObservers();
  }

  setValue(value: number | number[]): void {
    this.value = value;
    this.setPosition(this.getProportionValue(value));
    this.notifyObservers();
  }

  posToValProportion(value: number | number[]): number | number[] {
    if (Array.isArray(value)) {
      return value.map((v) => Math.round(v / this.getProportion()));
    } else if (value == 0) {
      return value;
    } else {
      return Math.round(value / this.getProportion());
    }
  }

  getValue(): number | number[] {
    return this.value as number | number[];
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
  getObservers(): IObserver[] {
    return this.observers;
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  private notifyObservers(): void {
    for (const observer of this.observers) {
      if (Array.isArray(this.value)) {
        this.value.forEach((val) => observer.update(val));
      } else if (typeof this.value == "number") {
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
    } else if (value === 0) {
      return value;
    } else {
      const proportionValue =
        ((value - min) / (max - min)) * this.containerWidth;
      return proportionValue;
    }
  }
  getProportion(): number {
    const max = this.getMax();
    const min = this.getMin();
    const proportion = this.containerWidth / (max - min);
    // console.log(
    //   `proportion: containerWidth: ${this.containerWidth} / max ${max} - min ${min} = ${proportion}`
    // );
    return proportion;
  }
}
