import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { IOptions } from "../types/IOptions";

export class RangeSliderPresenter implements IPresenter, IObserver {
  private defaultOptions: IOptions;
  constructor(
    private model: IRangeSlider,
    private view: IRangeSliderView,
    private trackPresenter: TrackPresenter,
    private thumbPresenter: ThumbPresenter,
    private options?: IOptions
  ) {
    this.model = model;
    this.view = view;
    this.trackPresenter = trackPresenter;
    this.thumbPresenter = thumbPresenter;
    this.defaultOptions = this.getDefaultOptions();
    this.options = options
      ? Object.assign({}, this.defaultOptions, options)
      : this.defaultOptions;

    this.init();
  }
  private getDefaultOptions(): IOptions {
    return {
      max: 200,
      min: 0,
      orientation: "horizontal",
      tooltip: true
    };
  }
  init(): void {
    this.model.addObserver(this);
    this.thumbPresenter.addObserver(this);
    this.view.addValueChangeListener(this.updateView.bind(this));
    this.updateView();
    this.thumbPresenter.updateView();

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
