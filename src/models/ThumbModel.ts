import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { Ruler } from "./Ruler";
export class ThumbModel implements IThumbModel {
  private position: number | number[];
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number;
  private min: number;
  private max: number;
  private value?: number | number[];
  private containerWidth: number;
  private containerHeight: number;
  private step: number;
  private options: IOptions = Config.getInstance().getOptions();
  private containerOrientationValue: number;

  constructor() {
    this.min = this.options.min as number;
    this.max = this.options.max as number;
    this.step = this.validateStep(this.options.step as number);
    this.thumbSize = this.options.thumbSize as number;
    // this.position = this.getProportionValue(
    //   this.options.value as number | number[]
    // );

    this.containerWidth = this.getContainerWidth() - this.thumbSize;
    this.containerHeight = this.getContainerHeight() - this.thumbSize;
    this.value = this.options.value ? this.options.value : (0 as number);
    this.containerOrientationValue =
      this.options.orientation === "horizontal"
        ? this.containerWidth
        : this.containerHeight;
    if (!this.options.reverseOrder) {
      this.position = this.getProportionValue(
        this.options.value as number | number[]
      );
    } else {
      let a = this.getProportionValue(this.max) as number;
      let b = this.getProportionValue(this.value as number | number[]);
      let c = Array.isArray(b) ? b.map((i) => a - i) : a - b;
      this.position = c;
      console.log(b);
      console.log(c);
    }
    this.test();
  }

  // ===========test====
  test(): void {
    console.log(this.position);
    // console.log(this.splitNum(800, 3));
    // console.log(this.getValueString([400, 800]));
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
      if (!this.options.reverseOrder) {
        return value.map((v) => Math.round(v / this.getProportion()));
      } else {
        return value.map(
          (v) => this.getMax() - Math.round(v / this.getProportion())
        );
      }
    } else if (value == 0) {
      return value;
    } else {
      if (!this.options.reverseOrder) {
        return Math.round(value / this.getProportion());
      } else {
        return this.getMax() - Math.round(value / this.getProportion());
      }
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

  getContainerHeight(): number {
    return this.options.containerHeight as number;
  }

  getProportionValue(value: number | number[]): number | number[] {
    const max = this.getMax();
    const min = this.getMin();
    if (Array.isArray(value)) {
      return value.map(
        (val) => ((val - min) / (max - min)) * this.containerOrientationValue
      );
    } else if (value === 0) {
      return value;
    } else {
      const proportionValue =
        ((value - min) / (max - min)) * this.containerOrientationValue;
      return proportionValue;
    }
  }
  getProportion(): number {
    const max = this.getMax();
    const min = this.getMin();
    const proportion = this.containerOrientationValue / (max - min);
    return proportion;
  }

  getValueString(value: number | number[]): string | string[] | undefined {
    let stringValue = "";
    if (this.options.stringValues) {
      const userStrings = this.options.stringValues as string[];
      let parts: number = userStrings.length;
      const splitArr = this.splitNum(this.max as number, parts);
      if (Array.isArray(value)) {
        const stringValueArr: string[] = [];

        value.forEach((val) => {
          let ranges = [0, ...splitArr];
          for (let i = 0; i <= userStrings.length; i++) {
            if (val >= ranges[i] && val <= ranges[i + 1]) {
              stringValueArr.push(userStrings[i]);
              break;
            }
          }
        });
        return stringValueArr;
      } else {
        let ranges = [0, ...splitArr];
        for (let i = 0; i <= userStrings.length; i++) {
          if (value >= ranges[i] && value <= ranges[i + 1]) {
            stringValue = userStrings[i];
            break;
          }
        }
        return stringValue;
      }
    }
  }

  splitNum(num: number, parts: number): number[] {
    let splitArr: number[] = [];
    let part = num / parts;
    for (let i = 0; i <= parts - 1; i++) {
      splitArr.push(part * (i + 1));
    }
    return splitArr;
  }

  validateStep(step: number): number {
    if (step > this.max) {
      step = this.max;
    } else if (step <= this.min) {
      step = this.min;
    }
    return step;
  }
}
