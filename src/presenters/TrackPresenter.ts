import { ITrackView } from "../types/IViews/ITrackView";
import { ITrackModel } from "../types/IModels/ITrackModel";
import { ITrackPresenter } from "../types/IPresenters/ITrackPresenter";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../types/IConfigurationService/IOptions";

export class TrackPresenter implements ITrackPresenter, IObserver {
  private mediator?: Mediator;
  private options: IOptions = Config.getInstance().getOptions();
  private startPoint: number;
  constructor(private trackModel: ITrackModel, private trackView: ITrackView) {
    this.trackModel = trackModel;
    this.trackView = trackView;
    this.startPoint = this.options.containerViewportLeft as number;
    this.init();
  }

  init(): void {
    this.trackModel.addObserver(this);
    this.trackView.addPositionChangeListener(this.trackClickHandler.bind(this));
    this.updateView();
    console.log(`------tick-- ${this.getCalculatedTickStep(800)}`);
  }

  update(clickPosition: number): void {
    this.updateView();
  }
  private updateView(): void {
    this.trackView.render(
      this.trackModel.getWidth(),
      this.trackModel.getHeight()
    );
  }
  onThumbPositionChange(position: number): void {
    console.log(`thumbPositionChange ${position}`);
  }
  trackClickHandler(e: MouseEvent | TouchEvent): void {
    if (e instanceof MouseEvent) {
      let position: number =
        e.clientX - this.startPoint + (this.options.thumbSize as number) / 2;

      this.onThumbPositionChange(position);
      this.mediator?.notifyTrackClick(position);
      console.log(`----trackClickHandler: ${position}`);
    }
  }
  setMediator(mediator?: Mediator): void {
    if (mediator) this.mediator = mediator;
  }

  getCalculatedTickStep(num: number): number {
    let tickStep: number = 1;
    let max = num;

    const significant = this.removeTrailingZeros(max);

    if (this.isValidPartition(max / significant.num, max)) {
      return (tickStep = max / significant.num);
    } else {
      const validTicksSteps: number[] = this.getValidTickStepsArr(
        tickStep,
        max
      );
      tickStep = this.getFavorableTickStep(validTicksSteps, max);
      return tickStep;
    }
  }
  isFirstDigitPlain(num: number): boolean {
    return this.removeTrailingZeros(num).num / 10 < 1;
  }

  getValidMultipliers(max: number): number[] {
    const multipliers: number[] = [];
    const sqrtMax = Math.sqrt(max);
    for (let i = 1; i <= sqrtMax; i++) {
      if (max % i === 0) {
        multipliers.push(i);
        if (i !== max / i && i !== 1) {
          multipliers.push(max / i);
        }
      }
    }
    return multipliers.sort((a, b) => a - b);
  }

  isValidPartition(tickStep: number, max: number): boolean {
    const partitions = max / tickStep;
    const result = partitions <= 20 && partitions >= 6 && max % tickStep == 0;
    return result;
  }

  getFavorableTickStep(validTicksSteps: number[], max: number): number {
    let result: number = 0;
    for (let tick of validTicksSteps) {
      if (this.isFirstDigitPlain(tick)) {
        console.log(`====favorable====${tick}`);
        result = tick;
      }
    }
    result = result
      ? result
      : validTicksSteps.filter((num) => max / num == 10)[0] ??
        validTicksSteps[0];
    return result;
  }

  getValidTickStepsArr(tickStep: number, max: number): number[] {
    const validTicksSteps: number[] = [];
    const magnitudes = this.getValidMultipliers(max);

    for (const magnitude of magnitudes) {
      const newTickStep = tickStep * magnitude;

      if (this.isValidPartition(newTickStep, max)) {
        validTicksSteps.push(newTickStep);
      }
    }

    return validTicksSteps;
  }

  removeTrailingZeros(num: number): { num: number; grade: number } {
    let grade: number = 0;
    if (num === 0) return { num: 0, grade: 0 };
    while (num % 10 === 0 && num !== 0) {
      grade++;
      num /= 10;
    }
    return {
      num: num,
      grade: grade
    };
  }
}
