import { ITrackView } from "../types/IViews/ITrackView";
import { ITrackModel } from "../types/IModels/ITrackModel";
import { ITrackPresenter } from "../types/IPresenters/ITrackPresenter";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Ruler } from "../models/Ruler";

export class TrackPresenter implements ITrackPresenter, IObserver {
  private mediator?: Mediator;
  private options: IOptions = Config.getInstance().getOptions();
  private startPoint: number;
  private ruler: Ruler;
  private tickStep: number;
  constructor(private trackModel: ITrackModel, private trackView: ITrackView) {
    this.trackModel = trackModel;
    this.trackView = trackView;
    this.startPoint = this.options.containerViewportLeft as number;
    this.ruler = new Ruler();
    this.tickStep = this.options.tickStep
      ? this.options.tickStep
      : this.ruler.getCalculatedTickStep(this.options.max as number);
    this.init();
  }

  init(): void {
    this.trackModel.addObserver(this);
    this.trackView.addPositionChangeListener(this.trackClickHandler.bind(this));
    this.updateView();
  }

  update(clickPosition: number): void {
    this.updateView();
  }
  private updateView(): void {
    this.trackView.render(
      this.trackModel.getWidth(),
      this.trackModel.getHeight(),
      this.tickStep
    );
  }
  onThumbPositionChange(position: number): void {}
  trackClickHandler(e: MouseEvent | TouchEvent): void {
    if (e instanceof MouseEvent) {
      let position: number =
        e.clientX - this.startPoint + (this.options.thumbSize as number) / 2;

      this.onThumbPositionChange(position);
      this.mediator?.notifyTrackClick(position);
    }
  }
  setMediator(mediator?: Mediator): void {
    if (mediator) this.mediator = mediator;
  }
}
