import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";

type NumberOrArray = number | number[];
type ValuePosObject = { val: number | number[]; pos: number | number[] };

export class ThumbModel implements IThumbModel {
  private position: NumberOrArray = 0;
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number = 0;
  private min: number = 0;
  private max: number = 0;
  private value?: NumberOrArray;
  private containerWidth: number = 0;
  private containerHeight: number = 0;
  private step: number = 0;
  private options: IOptions;
  private containerOrientationValue: number = 0;

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
    this.value = this.options.value ? this.options.value : this.min;

    this.containerOrientationValue = this.setContainerOrientationValue();
    this.position = this.setInitialPosition().pos;
  }
  validateAscendingArr(arr: NumberOrArray): NumberOrArray {
    if (Array.isArray(arr)) {
      if (arr[0] > arr[1]) {
        return arr.reverse();
      } else {
        return arr;
      }
    } else return arr;
  }

  mergeWithPosition(pos: NumberOrArray): ValuePosObject {
    const p: NumberOrArray = this.validateAscendingArr(pos);
    const temp: NumberOrArray = !this.options.reversedOrder
      ? this.convertToValue(pos)
      : this.convertToValueReversed(pos);
    const v: NumberOrArray = temp;
    return { val: v, pos: p };
  }

  mergeWithValue(val: NumberOrArray): ValuePosObject {
    const v: NumberOrArray = val;
    const temp: NumberOrArray = !this.options.reversedOrder
      ? this.convertToPosition(val)
      : this.convertToPositionReversed(val);
    const p: NumberOrArray = temp;
    return { val: v, pos: p };
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  setContainerOrientationValue(): number {
    return this.options.orientation === "horizontal"
      ? this.containerWidth
      : this.containerHeight;
  }

  setInitialPosition(): ValuePosObject {
    return this.mergeWithValue(this.options.value as NumberOrArray);
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
  getPosition(): NumberOrArray {
    return this.position;
  }
  setPosition(position: NumberOrArray): void {
    this.position = position;
    this.value = this.mergeWithPosition(position).val;
    this.notifyObservers();
  }

  setValue(value: NumberOrArray): void {
    this.value = value;
    this.position = this.mergeWithValue(value).pos;
    this.notifyObservers();
  }

  convertToValueReversed(position: NumberOrArray): NumberOrArray {
    const convertedVal = this.convertToValue(position);
    if (Array.isArray(convertedVal)) {
      return convertedVal.map((p) => this.getMax() - p + this.min);
    } else {
      return this.getMax() - convertedVal + this.min;
    }
  }
  convertToValue(position: NumberOrArray): NumberOrArray {
    if (Array.isArray(position)) {
      return position.map((p) =>
        Math.round(p / this.getProportion() + this.min)
      );
    } else if (position == 0) {
      return position;
    } else {
      return Math.round(position / this.getProportion() + this.min);
    }
  }

  convertToPosition(value: NumberOrArray): NumberOrArray {
    const max = this.getMax();
    const min = this.getMin();
    if (Array.isArray(value)) {
      return value.map(
        (val) =>
          (val / (max - min)) * this.containerOrientationValue -
          min * this.getProportion()
      );
    } else if (value === 0 || value < min) {
      return min;
    } else {
      const proportionValue =
        (value / (max - min)) * this.containerOrientationValue -
        min * this.getProportion();
      return proportionValue;
    }
  }
  convertToPositionReversed(value: NumberOrArray): NumberOrArray {
    const proportionMax: number = this.convertToPosition(this.max) as number;
    const proportionVal: NumberOrArray = this.convertToPosition(value);
    let reverseVal: NumberOrArray;

    if (Array.isArray(proportionVal)) {
      reverseVal = proportionVal.map((val) => proportionMax - val);
    } else {
      reverseVal = proportionMax - proportionVal;
    }
    return reverseVal;
  }

  getValue(): NumberOrArray {
    return this.value as NumberOrArray;
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
    return this.options.pluginHeight as number;
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
    }
    return step;
  }
}
