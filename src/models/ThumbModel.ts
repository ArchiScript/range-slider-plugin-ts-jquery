import { IObserver } from "../types/IObserver";
import { IThumbModel } from "../types/IModels/IThumbModel";
export class ThumbModel implements IThumbModel {
  public $element: HTMLElement;
  public position: number;
  private observers: IObserver[] = [];

  constructor(element: HTMLElement, position: number) {
    this.$element = element;
    this.position = position;
  }

  public updatePosition(position: number): void {
    this.position = position;
  }
  getPosition(): number {
    return this.position;
  }
  setPosition(position: number): void {
    this.position = position;
  }
  enableDrag(): void {}
  disableDrag(): void {}
  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}
