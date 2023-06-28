import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { TrackModel } from "../models/TrackModel";
import { TrackView } from "../views/TrackView";

export class RangeSliderPresenter implements IPresenter, IObserver {
  constructor(
    private model: IRangeSlider,
    private view: IRangeSliderView,
    public trackPresenter: TrackPresenter
  ) {
    this.model = model;
    this.view = view;

    this.trackPresenter = trackPresenter;
  }

  init(): void {
    this.model.addObserver(this);
    this.view.addValueChangeListener(this.incrementHandler.bind(this));
    this.view.addValueChangeListener(this.updateView.bind(this));
    this.updateView();
  }

  update(value: number): void {
    this.updateView();
  }

  updateValue(value: number): void {
    this.model.setValue(value);
  }
  incrementHandler(): void {
    this.model.increment();
    console.log(this.model.getValue());
  }
  private updateView(): void {
    const value = this.model.getValue();
    this.view.render(value);
  }
}
