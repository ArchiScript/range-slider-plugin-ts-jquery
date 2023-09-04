import { ITrackModel } from "../types/IModels/ITrackModel";
import { IObserver } from "../types/IObserver";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";

export class TrackModel implements ITrackModel {
  private width!: number;
  private height!: number;
  private observers: IObserver[] = [];
  private options: IOptions;

  constructor() {
    this.options = Config.getInstance().getOptions();
    this.init();
  }

  init(): void {
    if (this.options.orientation === "horizontal") {
      this.height = this.options.trackHeight as number;
      this.width = 100;
    } else {
      this.height = 100;
      this.width = this.options.trackHeight as number;
    }
  }
  updateOptions(): void {
    this.options = Config.getInstance().getOptions();
    this.init();
  }

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

  // notifyObservers(): void {
  //   for (let observer of this.observers) {
  //     observer.update();
  //   }
  // }
}
