import { ITrackView } from "../types/IViews/ITrackView";
import { ITrackModel } from "../types/IModels/ITrackModel";
import { ITrackPresenter } from "../types/IPresenters/ITrackPresenter";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
import { ConfigService } from "../ConfigService/ConfigService";
import { IOptions } from "../types/IConfigurationService/IOptions";

export class TrackPresenter implements ITrackPresenter, IObserver {
  private mediator?: Mediator;
  private options: IOptions = ConfigService.getInstance().getOptions();
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
      console.log(`------trackClickHandler ${e.clientX}`);

      let position: number =
        e.clientX - this.startPoint + (this.options.thumbSize as number) / 2;
      console.log(`^^^^^^^trackClickHandler ------ pos ${position}`);

      this.onThumbPositionChange(position);
      this.mediator?.notifyTrackClick(position);
    }
  }
  setMediator(mediator?: Mediator): void {
    if (mediator) this.mediator = mediator;
  }
}
