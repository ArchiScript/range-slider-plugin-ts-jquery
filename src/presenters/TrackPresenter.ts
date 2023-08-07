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
    this.getCalculatedTickStep(30);
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

  getCalculatedTickStep(num: number): void {
    let tickStep: number;
    // let max = this.options.max as number;
    let max = num as number;

    let significant: { num: number; grade: number } =
      this.removeTrailingZeros(max);
    let half =
      significant.grade > 1
        ? 5 * 10 ** (significant.grade - 1)
        : 5 * 10 ** significant.grade;
    let significantIsPlain = significant.num / 10 < 1;

    const magnitude = Math.floor(Math.log10(max));
    const firstDigit = Math.floor(max / 10 ** magnitude);
    tickStep = 10 ** magnitude;
    tickStep = this.getValidPartitions(tickStep, max, significant.grade);

    console.log(`------half: ${half}`);
    console.log(
      `----- tick: ${tickStep} ---${significant.num}--${significant.grade}`
    );
    if (significantIsPlain) {
      tickStep = max / significant.num;
      tickStep = this.getValidPartitions(tickStep, max, significant.grade);
      console.log(
        `----this number is plain: ${significant.num} tick: ${tickStep}`
      );
    } else if (significantIsPlain && max % half == 0) {
      tickStep = max / (max / half);
      tickStep = this.getValidPartitions(tickStep, max, significant.grade);
      console.log(
        `----- tick: ${tickStep} ---${significant.num}--${significant.grade}`
      );
    }
  }
  isValidPartition(tickStep: number, max: number): boolean {
    const partitions = max / tickStep;
    return partitions < 20 && partitions > 4;
  }
  getValidPartitions(tickStep: number, max: number, grade: number): number {
    const partitions = max / tickStep;
    const minPartitions = 4;
    const maxPartitions = 20;
    if (partitions < minPartitions) {
      return (tickStep /= 10);
    } else if (partitions > maxPartitions) {
      return (tickStep *= 10);
    } else return tickStep;
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
