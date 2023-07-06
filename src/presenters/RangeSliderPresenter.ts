import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Mediator } from "./Mediator";

export class RangeSliderPresenter implements IPresenter, IObserver {
  private mediator: Mediator;
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
    this.mediator = new Mediator(this.trackPresenter, this.thumbPresenter);
    this.options = ConfigService.getInstance().getOptions();
    this.init();
  }
  init(): void {
    this.model.addObserver(this);
    this.thumbPresenter.addObserver(this);
    this.view.addValueChangeListener(this.updateView.bind(this));
    this.thumbPresenter.setMediator(this.mediator);
    this.trackPresenter.setMediator(this.mediator);
    this.updateView();
    this.thumbPresenter.updateView();
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
