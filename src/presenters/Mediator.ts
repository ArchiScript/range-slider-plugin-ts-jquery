import { IMediator } from "../types/IPresenters/IMediator";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
export class Mediator implements IMediator {
  private trackPresenter: TrackPresenter;
  private thumbPresenter: ThumbPresenter;

  constructor(trackPresenter: TrackPresenter, thumbPresenter: ThumbPresenter) {
    this.trackPresenter = trackPresenter;
    this.thumbPresenter = thumbPresenter;
  }

  public notifyTrackClick(clickPosition: number): void {
    this.thumbPresenter.onTrackClick(clickPosition);
  }

  public notifyThumbPositionChange(position: number): void {
    this.trackPresenter.onThumbPositionChange(position);
  }
}
