import { ITrackView } from "../types/IViews/ITrackView";
import { ITrackModel } from "../types/IModels/ITrackModel";
import { ITrackPresenter } from "../types/IPresenters/ITrackPresenter";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";

export class TrackPresenter implements ITrackPresenter, IObserver {
  private mediator?: Mediator;
  constructor(private trackModel: ITrackModel, private trackView: ITrackView) {
    this.trackModel = trackModel;
    this.trackView = trackView;
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
      console.log(`trackClickHandler ${e.clientX}`);
      this.onThumbPositionChange(e.clientX);
      this.mediator?.notifyTrackClick(e.clientX);
      // this.mediator?.setFill(e.clientX);
    }
  }
  setMediator(mediator?: Mediator): void {
    if (mediator) this.mediator = mediator;
  }
}
