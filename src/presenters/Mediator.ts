import { IMediator } from "../types/IPresenters/IMediator";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { FillPresenter } from "./FillPresenter";
export class Mediator implements IMediator {
  private trackPresenter: TrackPresenter;
  private thumbPresenter: ThumbPresenter;
  private fillPresenter: FillPresenter;

  constructor(
    trackPresenter: TrackPresenter,
    thumbPresenter: ThumbPresenter,
    fillPresenter: FillPresenter
  ) {
    this.trackPresenter = trackPresenter;
    this.thumbPresenter = thumbPresenter;
    this.fillPresenter = fillPresenter;
  }
  public getThumbPresenter(): ThumbPresenter {
    return this.thumbPresenter;
  }
  public notifyTrackClick(clickPosition: number): void {
    this.thumbPresenter.onTrackClick(clickPosition);
  }

  public notifyThumbPositionChange(position: number): void {
    this.fillPresenter.onThumbPositionChange(position);
  }
  public notifyFillPosition(position: number | number[]): void {
    this.fillPresenter.updateValue(position);
  }
  public getStartPointFromTrack(): { left: number; top: number } {
    return this.trackPresenter.getTrackStartPoint();
  }
}
