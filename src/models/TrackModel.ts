import { ITrackModel } from "../types/IModels/ITrackModel";
import { IObserver } from "../types/IObserver";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";

export class TrackModel implements ITrackModel {
  private width: number = 100;
  private height: number;

  private observers: IObserver[] = [];
  private options: IOptions = ConfigService.getInstance().getOptions();

  constructor() {
    this.height = Number(this.options.trackHeight);
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  getHeight(): number {
    console.log(this.height);
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

  // notifyObservers(): void {
  //   for (let observer of this.observers) {
  //     observer.update();
  //   }
  // }
}
