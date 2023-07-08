import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { IPositionObj } from "../types/IConfigurationService/IPositionObj";
export class ThumbModel implements IThumbModel {
  private position: number;
  private observers: IObserver[] = [];
  private dragging: boolean = false;
  private thumbSize: number = 15;
  private min: number;
  private max: number;
  private containerWidth: number = 0;
  private positionObj: IPositionObj = {};
  private options: IOptions = ConfigService.getInstance().getOptions();

  constructor() {
    this.min = Number(this.options.min);
    this.max = Number(this.options.max);
    this.position = Number(this.options.valueMin);
    this.positionObj = {
      position: this.position,
      percent: this.calculatePositionPercent(this.position)
    };
    this.test();
  }

  // ===========test====
  test(): void {
    console.log(`=======--- ${this.positionObj.percent}`);
    console.log(`====Proportion=== ${this.getProportionValue()}`);
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
    this.setPositionObj(position);
    this.notifyObservers();
  }
  getPositionObj(): IPositionObj {
    return this.positionObj;
  }
  setPositionObj(position: number): void {
    this.positionObj.position = position;
    this.positionObj.percent = this.calculatePositionPercent(position);
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
  calculatePositionPercent(position?: number): number {
    const val = position ? position : this.position;
    const max = this.getMax();
    const min = this.getMin();
    let pos = Math.round(((val - min) / (max - min)) * 100);
    console.log(`pos====${pos}`);
    return pos;
  }
  getPositionFromPercent(percent: number): number {
    const max = this.getMax();
    const min = this.getMin();
    const scale = percent / 100;
    let pos = scale * (max - min);

    return pos;
  }
  setContainerWidth(containerWidth: number): void {
    this.containerWidth = containerWidth;
    console.log(`Thumb model: containerWidth: ${containerWidth}`);
  }
  getContainerWidth(): number {
    return Number(this.options.containerWidth);
  }

  getPercentFromPx(elWidth: number, px: number): number {
    return (px / elWidth) * 100;
  }
  getProportionValue(): number {
    const valueRange = this.max - this.min;
    const pixelsPerValue = this.getContainerWidth() / valueRange;
    return this.min + Math.round(this.getPosition() / pixelsPerValue);
  }
}
