import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";

export class ThumbModel implements IThumbModel {
  private position!: number | number[];
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize!: number;
  private min!: number;
  private max!: number;
  private value?: number | number[];
  private containerWidth!: number;
  private containerHeight!: number;
  private step!: number;
  private options: IOptions;
  private containerOrientationValue!: number;

  constructor() {
    this.options = Config.getInstance().getOptions();
    this.init();
  }

  init(): void {
    this.min = this.options.min as number;
    this.max = this.options.max as number;
    this.step = this.validateStep(this.options.step as number);
    this.thumbSize = this.options.thumbSize as number;
    this.containerWidth = this.getContainerWidth() - this.thumbSize;
    this.containerHeight = this.getContainerHeight() - this.thumbSize;
    this.value = this.options.value ? this.options.value : (0 as number);
    this.containerOrientationValue = this.setContainerOrientationValue();
    this.position = this.setInitialPosition();
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    console.log("updateOptions");
    console.log(this.options);
    this.init();
  }
  setContainerOrientationValue(): number {
    return this.options.orientation === "horizontal"
      ? this.containerWidth
      : this.containerHeight;
  }

  setInitialPosition(): number | number[] {
    if (!this.options.reversedOrder) {
      return this.convertToPosition(this.options.value as number | number[]);
    } else {
      return this.convertToPositionReversed(
        this.options.value as number | number[]
      );
    }
  }

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
    if (this.options.reversedOrder) {
      this.position = position;
      this.value = this.convertToValueReversed(position);
      console.log(this.value);
    } else {
      this.position = position;
      this.value = this.convertToValue(position);
    }

    this.notifyObservers();
  }

  setValue(value: number | number[]): void {
    if (this.options.reversedOrder) {
      this.value = Array.isArray(value) ? value.reverse() : value;
      this.setPosition(this.convertToPositionReversed(value));
    } else {
      this.value = value;
      this.setPosition(this.convertToPosition(value));
    }

    this.notifyObservers();
  }

  convertToValueReversed(position: number | number[]): number | number[] {
    const convertedVal = this.convertToValue(position);
    if (Array.isArray(convertedVal)) {
      return convertedVal.map((v) => this.getMax() - v);
    } else {
      return this.getMax() - convertedVal;
    }
  }
  convertToValue(position: number | number[]): number | number[] {
    if (Array.isArray(position)) {
      return position.map((v) => Math.round(v / this.getProportion()));
    } else if (position == 0) {
      return position;
    } else {
      return Math.round(position / this.getProportion());
    }
  }

  convertToPosition(value: number | number[]): number | number[] {
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
  convertToPositionReversed(value: number | number[]): number | number[] {
    let proportionMax: number,
      proportionVal: number | number[],
      reverseVal: number | number[];

    proportionMax = this.convertToPosition(this.max) as number;
    proportionVal = this.convertToPosition(value);
    reverseVal = Array.isArray(proportionVal)
      ? proportionVal.map((val) => proportionMax - val).reverse()
      : proportionMax - proportionVal;

    return reverseVal;
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
