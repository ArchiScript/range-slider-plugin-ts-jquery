import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { TrackModel } from "../models/TrackModel";
import { TrackView } from "../views/TrackView";

export class RangeSliderPresenter implements IPresenter, IObserver {
  constructor(
    private model: IRangeSlider,
    private view: IRangeSliderView,
    private trackPresenter: TrackPresenter,
    private thumbPresenter: ThumbPresenter
  ) {
    this.model = model;
    this.view = view;
    this.trackPresenter = trackPresenter;
    this.thumbPresenter = thumbPresenter;
    this.init();
  }

  init(): void {
    this.model.addObserver(this);
    this.view.addValueChangeListener(this.incrementHandler.bind(this));
    this.view.addValueChangeListener(this.updateView.bind(this));

    this.updateView();
    this.thumbPresenter.updateView();
  }

  update(value: number): void {
    this.updateView();
  }

  updateValue(value: number): void {
    this.model.setValue(value);
  }
  incrementHandler(): void {
    this.model.increment();
    this.thumbPresenter.updatePosition(this.model.getValue());
    console.log(this.model.getValue());
  }
  private updateView(): void {
    const value = this.model.getValue();

    this.view.render(value);
  }
}
