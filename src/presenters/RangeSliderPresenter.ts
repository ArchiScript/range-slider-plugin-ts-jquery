import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";

export class RangeSliderPresenter implements IPresenter, IObserver {
  private options: IOptions;
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
    this.options = ConfigService.getInstance().getOptions();

    this.init();
  }
  init(): void {
    this.model.addObserver(this);

    this.thumbPresenter.addObserver(this);
    this.thumbPresenter.updatePosition(Number(this.options.min));
    this.view.addValueChangeListener(this.updateView.bind(this));
    this.updateView();
    this.thumbPresenter.updateView();
    console.log("RanegsliderPresenter options:");
    console.log(this.options);
  }

  update(value: number): void {
    this.view.render(value);
    console.log(`observer works ${value}`);
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
