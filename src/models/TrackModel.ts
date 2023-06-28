import { ITrackModel } from "../types/IModels/ITrackModel";
import { IObserver } from "../types/IObserver";

export class TrackModel implements ITrackModel {
  public width: number = 200;
  public height: number = 15;
  private observers: IObserver[] = [];

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  getHeight(): number {
    return this.height;
  }

  setHeight(height: number): void {
    this.height = height;
  }
  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}
