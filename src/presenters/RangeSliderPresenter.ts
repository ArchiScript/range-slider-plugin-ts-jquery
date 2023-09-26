import { IPresenter } from "../types/IPresenters/IPresenter";
import { IRangeSlider } from "../types/IModels/IRangeSlider";
import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { IObserver } from "../types/IObserver";
import { TrackPresenter } from "./TrackPresenter";
import { ThumbPresenter } from "./ThumbPresenter";
import { FillPresenter } from "./FillPresenter";
import { IOptions } from "../types/IConfigurationService/IOptions";
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
    this.options = Config.getInstance().getOptions();
    this.init();
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  init(): void {
    this.model.addObserver(this);
    this.thumbPresenter.addObserver(this);
    this.thumbPresenter.setMediator(this.mediator);
    this.trackPresenter.setMediator(this.mediator);
    this.fillPresenter.setMediator(this.mediator);

    this.updateView();
    const thumbPos: number | number[] =
      this.thumbPresenter.getCurrentFillPosition();
    this.fillPresenter.updateValue(thumbPos);
    this.thumbPresenter.updateView();
  }
  getMediator() {
    return this.mediator;
  }

  update(value: number | number[]): void {
    if (Array.isArray(value) && value[0] > value[1]) {
      value = value.reverse();
    }
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
