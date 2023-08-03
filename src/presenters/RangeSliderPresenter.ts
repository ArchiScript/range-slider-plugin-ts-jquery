import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { FillPresenter } from "./FillPresenter";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { Mediator } from "./Mediator";

export class RangeSliderPresenter implements IPresenter, IObserver {
  private mediator: Mediator;
  private options: IOptions;
  constructor(
    private model: IRangeSlider,
    private view: IRangeSliderView,
    private trackPresenter: TrackPresenter,
    private thumbPresenter: ThumbPresenter,
    private fillPresenter: FillPresenter
  ) {
    this.model = model;
    this.view = view;
    this.trackPresenter = trackPresenter;
    this.thumbPresenter = thumbPresenter;
    this.fillPresenter = fillPresenter;
    this.mediator = new Mediator(
      this.trackPresenter,
      this.thumbPresenter,
      this.fillPresenter
    );
    // this.options = ConfigService.getInstance().getOptions();
    this.options = Config.getInstance().getOptions();
    this.init();
  }
  init(): void {
    this.model.addObserver(this);
    this.thumbPresenter.addObserver(this);
    this.thumbPresenter.setMediator(this.mediator);
    this.trackPresenter.setMediator(this.mediator);
    this.fillPresenter.setMediator(this.mediator);
    this.updateView();
    this.thumbPresenter.updateView();

    const thumbPos: number | number[] =
      this.thumbPresenter.getCurrentFillPosition();

    this.fillPresenter.updateValue(thumbPos);
    console.log("-----options:");
    console.log(this.options);
  }
  getMediator() {
    return this.mediator;
  }
  update(value: number | number[]): void {
    this.view.render(value);
  }

  updateValue(value: number): void {
    this.model.setValue(value);
  }

  private updateView(): void {
    const value = this.model.getValue();
    this.view.render(value);
  }
}
